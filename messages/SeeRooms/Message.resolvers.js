import client from "../../client";
import { protectResolvers } from "../../users/users.utils";

export default {
  Room: {
    users: ({ id }) =>
      client.user.findMany({ where: { rooms: { some: { id } } } }),
    messages: ({ id }) => client.message.findMany({ where: { roomId: id } }),
    unreadTotal: protectResolvers(({ id }, _, { loggedInUser }) =>
      client.message.count({
        where: {
          read: false,
          roomId: id,
          user: { id: { not: loggedInUser.id } },
        },
      })
    ),
  },
  Message: {
    user: ({ id }) =>
      client.user.findFirst({ where: { messages: { some: { id } } } }),
  },
};
