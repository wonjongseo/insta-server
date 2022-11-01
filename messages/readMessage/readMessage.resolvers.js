import client from "../../client";
import { INVALID_AUTHOTICATION, THROW_EXCEPTION } from "../../exception";
import { protectResolvers } from "../../users/users.utils";

export default {
  Mutation: {
    readMessage: protectResolvers(
      async (_, { messageId }, { loggedInUser }) => {
        try {
          const message = await client.message.findFirst({
            where: {
              id: messageId,
              userId: {
                not: loggedInUser.id,
              },
              room: {
                users: {
                  some: {
                    id: loggedInUser.id,
                  },
                },
              },
            },
            select: {
              id: true,
            },
          });
          if (!message) INVALID_AUTHOTICATION;

          await client.message.update({
            where: { id: messageId },
            data: {
              read: true,
            },
          });

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
