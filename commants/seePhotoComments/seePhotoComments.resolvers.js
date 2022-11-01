import client from "../../client";

// seePhotoComments(photoId: Int!): SeePhotoCommentsResult!
export default {
  Query: {
    seePhotoComments: async (_, { photoId }) => {
      //   client.photo.findUnique({where : {id : photoId}, include : {comments}})
      const comments = await client.comment.findMany({
        where: { photoId },
        orderBy: {
          createdAt: "asc",
        },
      });
      console.log(comments);

      return {
        ok: true,
        comments,
      };
    },
  },
};
