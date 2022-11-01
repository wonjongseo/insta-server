import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    bio: String
    avatar: String
    followers: [User]
    following: [User]
    totalFollowing: Int!
    totalFollower: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    photos: [Photo]
    createdAt: String!
    updatedAt: String!
  }
`;
