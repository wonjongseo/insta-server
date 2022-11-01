import { gql } from "apollo-server";

export default gql`
  type SeeRoomResult {
    ok: Boolean!
    error: String
    room: Room
  }
  type Query {
    seeRoom(roomId: Int!): SeeRoomResult!
  }
`;
