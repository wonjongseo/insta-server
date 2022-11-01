import { gql } from "apollo-server-core";
export default gql`
  type EditPhotoResult {
    ok: Boolean!
    error: String
    photo: Photo
  }
  type Mutation {
    editPhoto(photoId: Int!, file: Upload, caption: String): EditPhotoResult!
  }
`;
