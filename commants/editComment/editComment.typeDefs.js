import { gql } from "apollo-server-core";
/**
  type Mutation {
    editComment(commentId: Int!, payload: "new payload"){
        ok
        error
        comment {
            id 
            payload
        }
    }
  }
 */
export default gql`
  type EditCommentResult {
    ok: Boolean!
    error: String
    comment: Comment
  }
  type Mutation {
    editComment(commentId: Int!, payload: String!): EditCommentResult!
  }
`;
