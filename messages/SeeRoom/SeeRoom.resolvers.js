import client from "../../client";
import { protectResolvers } from "../../users/users.utils";

export default {
  Query: {
    seeRoom: protectResolvers(async (_, { roomId }, { loggedInUser }) => {
      const room = await client.room.findFirst({
        where: { id: roomId, user: { some: { id: loggedInUser.id } } },
      });

      if (!room) return ROOM_NOT_FOUND;

      return {
        ok: true,
        room,
      };
    }),
  },
};
