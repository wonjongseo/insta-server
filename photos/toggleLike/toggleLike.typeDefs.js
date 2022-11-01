import { gql } from "apollo-server-core";
/*
mutation {
  toggleLike(photoId : ) {
    ok
    error
  }
}
*/
export default gql`
  type ToggleLikeResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    toggleLike(photoId: Int): ToggleLikeResult!
  }
`;
