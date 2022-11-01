import { gql } from "apollo-server-core";
/**
 mutation {
    deleteComment(id: 4){
        ok
        error
    }
  }
 */
export default gql`
  type DeleteCommentResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteComment(id: Int!): DeleteCommentResult!
  }
`;
