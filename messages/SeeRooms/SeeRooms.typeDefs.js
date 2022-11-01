import { gql } from "apollo-server";

export default gql`
  type SeeRoomsResult {
    ok: Boolean!
    error: String
    rooms: [Room]
  }
  type Query {
    seeRooms: SeeRoomsResult!
  }
`;
