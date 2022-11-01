import { gql } from "apollo-server-core";
export default gql`
  type SeeFollowingsResult {
    ok: Boolean!
    error: String
    followings: [User]
  }
  type Query {
    seeFollowings(username: String!, lastId: Int): SeeFollowingsResult!
  }
`;
