import client from "../../client";
import { HASHTAG_NOT_FOUND } from "../../exception";

export default {
  Query: {
    seeHashtag: async (_, { hashtag }) => {
      const foundHashtag = await client.hashtag.findUnique({
        where: { hashtag },
      });

      if (!foundHashtag) return HASHTAG_NOT_FOUND;

      return {
        hashtag: foundHashtag,
        ok: true,
      };
    },
  },
};
