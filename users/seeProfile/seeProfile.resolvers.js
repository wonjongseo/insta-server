import client from "../../client";
import { USER_NOT_FOUND } from "../../exception";

export default {
  Query: {
    seeProfile: async (_, { username }) => {
      const user = await client.user.findUnique({
        where: { username },
        include: {
          followers: true,
          following: true,
        },
      });
      if (!user) return USER_NOT_FOUND;
      return {
        ok: true,
        user,
      };
    },
  },
};
