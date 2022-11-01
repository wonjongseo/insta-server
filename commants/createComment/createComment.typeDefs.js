import { gql } from "apollo-server-core";
/*
mutation {
    createComment(photoId: 10 , payload: "Hello!") {
        ok
        comment {
            id
            createdAt
            payload
        }
        error
    }
  }
*/
export default gql`
  type CreateCommentResult {
    ok: Boolean!
    error: String
    comment: Comment
  }
  type Mutation {
    createComment(photoId: Int!, payload: String!): CreateCommentResult!
  }
`;
