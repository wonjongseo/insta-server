//  deleteComment(id: Int!): DeleteCommentResult!

import client from "../../client";
import {
  COMMENT_NOT_FOUND,
  INVALID_AUTHOTICATION,
  THROW_EXCEPTION,
} from "../../exception";
import { protectResolvers } from "../../users/users.utils";

export default {
  Mutation: {
    deleteComment: protectResolvers(async (_, { id }, { loggedInUser }) => {
      const comment = await client.comment.findUnique({
        where: { id },
        select: { userId: true },
      });

      if (!comment) return COMMENT_NOT_FOUND;

      if (comment.userId !== loggedInUser.id) return INVALID_AUTHOTICATION;

      try {
        await client.comment.delete({
          where: {
            id,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        return THROW_EXCEPTION(error);
      }
    }),
  },
};
