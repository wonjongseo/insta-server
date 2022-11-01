import client from "../../client";
import { USER_NOT_FOUND } from "../../exception";

export default {
  Query: {
    searchUsers: async (_, { keyword }) => {
      const users = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
      });
      if (users.length === 0) return USER_NOT_FOUND;

      return {
        ok: true,
        users,
      };
    },
  },
};
