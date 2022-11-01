import { gql } from "apollo-server-core";
export default gql`
  type MeResult {
    ok: Boolean!
    error: String
    me: User
  }
  type Query {
    me: MeResult!
  }
`;
