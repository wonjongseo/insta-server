import { gql } from "apollo-server";

/**
mutation {
  login(username:"username" , password: "password") {
    ok
    token
    error
  }
}
 */

export default gql`
  type LoginResult {
    ok: Boolean!
    error: String
    token: String
  }
  type Mutation {
    login(username: String!, password: String!): LoginResult!
  }
`;
