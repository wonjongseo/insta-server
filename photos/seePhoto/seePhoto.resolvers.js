import client from "../../client";
import { PHOTO_NOT_FOUND } from "../../exception";

export default {
  Query: {
    seePhoto: async (_, { photoId }) => {
      const photo = await client.photo.findUnique({ where: { id: photoId } });
      if (!photo) return PHOTO_NOT_FOUND;

      return {
        ok: true,
        photo,
      };
    },
  },
};
