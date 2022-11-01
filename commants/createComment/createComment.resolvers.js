import client from "../../client";
import { PHOTO_NOT_FOUND, THROW_EXCEPTION } from "../../exception";
import { protectResolvers } from "../../users/users.utils";

//createComment(payload: String!): CreateCommentResult!

export default {
  Mutation: {
    createComment: protectResolvers(
      async (_, { photoId, payload }, { loggedInUser }) => {
        const photo = await client.photo.findUnique({
          where: { id: photoId },
          select: { id: true },
        });

        if (!photo) return PHOTO_NOT_FOUND;
        try {
          const comment = await client.comment.create({
            data: {
              payload,
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

          return {
            comment,
            ok: true,
          };
        } catch (error) {
          return THROW_EXCEPTION(error);
        }
      }
    ),
  },
};
