import client from "../../client";
import { PHOTO_NOT_FOUND } from "../../exception";

export default {
  Query: {
    searchPhotos: async (_, { keyword }) => {
      const photos = await client.photo.findMany({
        where: {
          caption: {
            contains: keyword.toLowerCaset(),
          },
        },
      });
      if (!photos) return PHOTO_NOT_FOUND;

      return {
        ok: true,
        photos,
      };
    },
  },
};
