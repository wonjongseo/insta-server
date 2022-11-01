import client from "../../client";
import { protectResolvers } from "../users.utils";

export default {
  Mutation: {
    unFollowUser: protectResolvers(
      async (_, { username }, { loggedInUser }) => {
        const ok = client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        if (!ok)
          return {
            ok: false,
            error: "유저를 찾을 수 없습니다",
          };

        const user = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            following: {
              disconnect: {
                username,
              },
            },
          },
        });
        // console.log(users);
        return {
          ok: true,
          user: ok,
        };
      }
    ),
  },
};
