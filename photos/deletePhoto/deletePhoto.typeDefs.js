import { gql } from "apollo-server-core";

/**
mutation {
    deletePhoto(id : 10) {
        ok
        error
    }
}

 */
export default gql`
  type DeletePhotoResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deletePhoto(id: Int!): DeletePhotoResult!
  }
`;
