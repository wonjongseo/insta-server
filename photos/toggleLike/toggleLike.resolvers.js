import client from "../../client";
import { PHOTO_NOT_FOUND, THROW_EXCEPTION } from "../../exception";
import { protectResolvers } from "../../users/users.utils";

//likePhoto(photoId: Int): Result!
export default {
  Mutation: {
    toggleLike: protectResolvers(async (_, { photoId }, { loggedInUser }) => {
      const photo = await client.photo.findUnique({ where: { id: photoId } });
      if (!photo) return PHOTO_NOT_FOUND;

      const like = await client.like.findUnique({
        where: {
          photoId_userId: {
            photoId,
            userId: loggedInUser.id,
          },
        },
      });
      try {
        if (like) {
          await client.like.delete({
            where: {
              id: like.id,
            },
          });
        } else {
          await client.like.create({
            data: {
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              photo: {
                connect: {
                  id: photoId,
                },
              },
            },
          });
        }
      } catch (error) {
        return THROW_EXCEPTION(error);
      }
      return {
        ok: true,
      };
    }),
  },
};
