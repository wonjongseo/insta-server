import { gql } from "apollo-server-core";
export default gql`
  type SeePhotoLikeResult {
    ok: Boolean!
    error: String
    users: [User]
  }
  type Query {
    seePhotoLikes(photoId: Int!): SeePhotoLikeResult!
  }
`;
