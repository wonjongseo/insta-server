import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import {
  ROOM_NOT_FOUND,
  THROW_EXCEPTION,
  USER_NOT_FOUND,
} from "../../exception";
import pubsub from "../../pubsub";
import { protectResolvers } from "../../users/users.utils";

export default {
  Mutation: {
    sendMessage: protectResolvers(
      async (_, { username, payload }, { loggedInUser }) => {
        try {
          const friend = await client.user.findUnique({
            where: { username },
            select: { id: true },
          });
          if (!friend) return USER_NOT_FOUND;

          const room = await client.room.findFirst({
            where: {
              AND: [
                { users: { some: { username } } },
                { users: { some: { id: loggedInUser.id } } },
              ],
            },
          });

          if (!room) {
            room = await client.room.create({
              data: {
                users: {
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
          }

          const newMessage = await client.message.create({
            data: {
              payload,
              room: {
                connect: {
                  id: room.id,
                },
              },
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
            },
          });
          pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...newMessage } });

          return {
            ok: true,
          };
        } catch (error) {
          return THROW_EXCEPTION(error);
        }
      }
    ),
  },
};
