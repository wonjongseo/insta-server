import { gql } from "apollo-server";

export default gql`
  type SendMessageResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    sendMessage(username: String, payload: String!): SendMessageResult!
  }
`;
