import { gql } from "apollo-server-core";

/**
 {
    seePhotoComments(photoId: 9) {
    ok
    error 
    comments {
        id 
        createdAt
    }
 }
 }
 */
export default gql`
  type SeePhotoCommentsResult {
    ok: Boolean!
    error: String
    comments: [Comment]
  }
  type Query {
    seePhotoComments(photoId: Int!): SeePhotoCommentsResult!
  }
`;
