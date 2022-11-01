import client from "../../client";
import { USER_NOT_FOUND } from "../../exception";
import { protectResolvers } from "../../users/users.utils";

export default {
  Mutation: {
    createRoom: protectResolvers(async (_, { username }, { loggedInUser }) => {
      const existingRoom = await client.room.findFirst({
        where: {
          AND: [
            { user: { some: { username } } },
            { user: { some: { username: loggedInUser.username } } },
          ],
        },
      });

      console.log(existingRoom);
      if (existingRoom) {
        return {
          ok: true,
          room: existingRoom,
        };
      }

      const frient = await client.user.findUnique({ where: { username } });

      if (!frient) return USER_NOT_FOUND;

      const room = await client.room.create({
        data: {
          user: {
            connect: [
              {
                username,
              },
              {
                username: loggedInUser.username,
              },
            ],
          },
        },
      });

      return {
        ok: true,
        room,
      };
    }),
  },
};
