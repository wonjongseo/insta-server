import { gql } from "apollo-server-core";

/**

 {
  seePhoto(photoId : 9) {
    photo {
      comments {
        payload
      }
    }
    ok
    error
  }
 }

 */
export default gql`
  type SeePhotoResult {
    ok: Boolean!
    error: String
    photo: Photo
  }
  type Query {
    seePhoto(photoId: Int!): SeePhotoResult!
  }
`;
