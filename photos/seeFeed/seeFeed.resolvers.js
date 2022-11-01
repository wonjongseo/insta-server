// seeFeed: SeeFeedResult!

import client from "../../client";
import { THROW_EXCEPTION } from "../../exception";
import { protectResolvers } from "../../users/users.utils";

/**

query {
    seeFeed { 
        ok  
        error 
        photos {
            caption
        }
    }
}

 */

export default {
  Query: {
    seeFeed: protectResolvers(async (_, { offset }, { loggedInUser }) => {
      try {
        console.log(offset);
        const photos = await client.photo.findMany({
          take: 2,
          skip: offset,
          where: {
            OR: [
              {
                user: {
                  followers: {
                    some: { id: loggedInUser.id },
                  },
                },
              },
              {
                userId: loggedInUser.id,
              },
            ],
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        return {
          ok: true,
          photos,
        };
      } catch (error) {
        return THROW_EXCEPTION(error);
      }
    }),
  },
};
