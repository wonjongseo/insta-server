import { gql } from "apollo-server-express";

export default gql`
  type Message {
    id: Int!
    createdAt: String!
    updatedAt: String!
    payload: String!
    room: Room!
    user: User!
    read: Boolean!
  }

  type Room {
    id: Int!
    unreadTotal: Int!
    users: [User]
    messages: [Message]
    createdAt: String!
    updatedAt: String!
  }
`;
