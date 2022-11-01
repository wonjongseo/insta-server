import client from "../client";
import { protectResolvers } from "./users.utils";

export default {
  User: {
    totalFollowing: ({ id }) =>
      client.user.count({ where: { followers: { some: { id } } } }),

    totalFollower: ({ id }) =>
      client.user.count({ where: { following: { some: { id } } } }),

    isMe: protectResolvers(({ id }, _, { loggedInUser }) => {
      return id === loggedInUser.id;
    }),

    isFollowing: protectResolvers(async ({ id }, _, { loggedInUser }) => {
      if (id === loggedInUser.id) return false;

      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });

      return Boolean(exists);
    }),
    // photos: ({ id }) => client.photo.findMany({ where: { userId: id } }),
    photos: ({ id }) => client.user.findUnique({ where: { id } }).photos(),
  },
};
