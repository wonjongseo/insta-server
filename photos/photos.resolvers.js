import client from "../client";

export default {
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }) =>
      client.hashtag.findMany({ where: { photos: { some: { id } } } }),
    likes: ({ id }) => client.like.count({ where: { photoId: id } }),
    commentNumber: ({ id }) => client.comment.count({ where: { photoId: id } }),
    comments: ({ id }) =>
      client.comment.findMany({
        where: { photoId: id },
        include: { user: true },
      }),
    isMine: ({ userId }, _, { loggedInUser }) => userId === loggedInUser?.id,
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await client.like.findUnique({
        where: {
          photoId_userId: {
            photoId: id,
            userId: loggedInUser.id,
          },
        },
        select: { id: true },
      });

      if (ok) {
        return true;
      } else return false;
    },
  },
  Hashtag: {
    photos: ({ id }, { page }) =>
      client.photo.findMany({
        where: { hashtags: { some: { id } } },
        skip: (page - 1) * 3,
        take: 3,
      }),
    totalPhotos: async ({ id }) => {
      const totalPhotos = await client.photo.count({
        where: { hashtags: { some: { id } } },
      });

      return totalPhotos;
    },
  },
};
