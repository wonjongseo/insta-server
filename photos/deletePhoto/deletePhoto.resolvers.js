//deletePhoto(id: Int!): DeletePhotoResult!
import fs from "fs";
import client from "../../client";
import {
  INVALID_AUTHOTICATION,
  PHOTO_NOT_FOUND,
  THROW_EXCEPTION,
} from "../../exception";
import { protectResolvers } from "../../users/users.utils";

export default {
  Mutation: {
    deletePhoto: protectResolvers(async (_, { id }, { loggedInUser }) => {
      const photo = await client.photo.findUnique({
        where: {
          id,
        },
        select: { userId: true, file: true },
      });

      if (!photo) return PHOTO_NOT_FOUND;

      if (loggedInUser.id !== photo.userId) return INVALID_AUTHOTICATION;

      try {
        const filenameInStatic = photo.file.indexOf("static/");
        const filename = photo.file.substring(7 + filenameInStatic);
        fs.unlinkSync(`${process.cwd()}/uploads/${filename}`);
        await client.photo.delete({ where: { id } });
        return {
          ok: true,
        };
      } catch (error) {
        return THROW_EXCEPTION(error);
      }
    }),
  },
};
