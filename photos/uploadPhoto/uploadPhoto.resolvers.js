import client from "../../client";
import fs from "fs";
import { protectResolvers } from "../../users/users.utils";
import { extractHashtags, loadFile } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectResolvers(
      async (_, { file, caption }, { loggedInUser }) => {
        console.log(file, caption);
        const fileUrl = await loadFile(file, loggedInUser.id);

        const hashtagObj = extractHashtags(caption);

        const photo = await client.photo.create({
          data: {
            file: fileUrl,
            caption,
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
        return {
          ok: true,
          photo,
        };
      }
    ),
  },
};
