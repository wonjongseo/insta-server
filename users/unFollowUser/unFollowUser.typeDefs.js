import { gql } from "apollo-server-core";
export default gql`
  type UnFollowUserResult {
    ok: Boolean!
    error: String
    user: User
  }
  type Mutation {
    unFollowUser(username: String): UnFollowUserResult!
  }
`;
