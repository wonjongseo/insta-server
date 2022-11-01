import client from "../../client";
import { THROW_EXCEPTION } from "../../exception";
import { protectResolvers } from "../../users/users.utils";

export default {
  Query: {
    seeRooms: protectResolvers(async (_, __, { loggedInUser }) => {
      try {
        const rooms = await client.room.findMany({
          where: {
            user: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        });

        return {
          ok: true,
          rooms,
        };
      } catch (error) {
        return THROW_EXCEPTION(error);
      }
    }),
  },
};
