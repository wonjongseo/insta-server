//  editComment(commentId: Int!, payload: String!): EditCommentResult!

import client from "../../client";
import {
  COMMENT_NOT_FOUND,
  INVALID_AUTHOTICATION,
  THROW_EXCEPTION,
} from "../../exception";
import { protectResolvers } from "../../users/users.utils";

export default {
  Mutation: {
    editComment: protectResolvers(
      async (_, { commentId, payload }, { loggedInUser }) => {
        const isExistingComment = await client.comment.findUnique({
          where: { id: commentId },
          select: { userId: true },
        });
        if (!isExistingComment) return COMMENT_NOT_FOUND;

        if (isExistingComment.userId !== loggedInUser.id)
          return INVALID_AUTHOTICATION;

        try {
          const comment = await client.comment.update({
            where: {
              id: commentId,
            },
            data: {
              payload,
            },
          });
          return {
            ok: true,
            comment,
          };
        } catch (error) {
          return THROW_EXCEPTION(error);
        }
      }
    ),
  },
};
