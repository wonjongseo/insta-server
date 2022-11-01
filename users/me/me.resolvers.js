import client from "../../client";
import { protectResolvers } from "../users.utils";

export default {
  Query: {
    me: protectResolvers(async (_, __, { loggedInUser }) => {
      const user = await client.user.findUnique({
        where: { id: loggedInUser.id },
      });

      return {
        ok: true,
        me: user,
      };
    }),
  },
};
