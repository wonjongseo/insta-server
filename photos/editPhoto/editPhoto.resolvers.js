import client from "../../client";
import { INVALID_AUTHOTICATION } from "../../exception";
import { protectResolvers } from "../../users/users.utils";
import { extractHashtags, loadFile } from "../photos.utils";

export default {
  Mutation: {
    editPhoto: protectResolvers(
      async (_, { photoId, file, caption }, { loggedInUser }) => {
        const oldPhoto = await client.photo.findFirst({
          where: {
            id: photoId,
            userId: loggedInUser.id,
          },
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });

        if (!oldPhoto) return INVALID_AUTHOTICATION;

        const fileUrl = await loadFile(file, loggedInUser.id);

        const hashtagObj = extractHashtags(caption);

        const updatedPhoto = await client.photo.update({
          where: { id: photoId },

          data: {
            caption,
            hashtags: {
              disconnect: oldPhoto.hashtags,
              connectOrCreate: hashtagObj,
            },
            ...(fileUrl && { file: fileUrl }),
          },
        });

        if (!updatedPhoto)
          return {
            ok: false,
            error: "사진을 수정하지 못하였습니다.",
          };
        return {
          ok: true,
          photo: updatedPhoto,
        };
      }
    ),
  },
};
