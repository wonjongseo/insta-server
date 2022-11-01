import { gql } from "apollo-server";

/**
 mutation {
  createAccount(firstName:"firstName", lastName:"lastName", email:"email", username:"username",password:"password"){
    ok
  }
}
 */

export default gql`
  type createAccountResult {
    ok: Boolean!
    error: String
    user: User
  }
  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String!
    ): createAccountResult!
  }
`;
