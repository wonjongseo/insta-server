// seePhotoLikes(photoId: Int!): SeePhotoLikeResult!

import client from "../../client";
import { PHOTO_NOT_FOUND } from "../../exception";

export default {
  Query: {
    seePhotoLikes: async (_, { photoId }) => {
      const likes = await client.like.findMany({
        where: { photoId },
        select: { user: true },
      });
      if (!likes) return PHOTO_NOT_FOUND;

      return {
        ok: true,
        users: likes.map((like) => like.user),
      };
    },
  },
};
