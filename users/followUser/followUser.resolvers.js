import { protectResolvers } from "../users.utils";
import client from "../../client";
export default {
  Mutation: {
    followUser: protectResolvers(async (_, { username }, { loggedInUser }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok)
        return {
          ok: false,
          error: "유저를 찾을 수 없습니다.",
        };
      const user = await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          following: {
            connect: {
              username,
            },
          },
        },
      });
      console.log(user);
      return {
        ok: true,
        user: ok,
      };
    }),
  },
};
