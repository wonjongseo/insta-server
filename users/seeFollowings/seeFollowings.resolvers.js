import client from "../../client";
import { USER_NOT_FOUND } from "../../exception";

export default {
  Query: {
    seeFollowings: async (_, { username, lastId }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });

      if (!ok) return USER_NOT_FOUND;

      const followings = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });

      return {
        ok: true,
        followings,
      };
    },
  },
};
