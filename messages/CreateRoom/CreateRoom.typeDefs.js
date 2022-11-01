import { gql } from "apollo-server";

export default gql`
  type CreateRoomResult {
    ok: Boolean!
    error: String
    room: Room
  }
  type Mutation {
    createRoom(username: String!): CreateRoomResult!
  }
`;
