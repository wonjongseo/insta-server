import { gql } from "apollo-server-core";
/**
 
mutation($file: Upload!,$caption :String ){
  uploadPhoto(file:$file, caption:$caption) {
    ok
    error
    photo {
      id
    }
  }
}
 */

export default gql`
  type UploadPhotoResult {
    ok: Boolean!
    error: String
    photo: Photo
  }
  type Mutation {
    uploadPhoto(file: Upload!, caption: String): UploadPhotoResult!
  }
`;
