import client from "../../client";
import bcrypt from "bcrypt";
import { protectResolvers } from "../users.utils";
import fs from "fs";

export default {
  Mutation: {
    editProfile: protectResolvers(
      async (
        _,
        {
          firstName,
          lastName,
          username,
          email,
          password: newPassword,
          bio,
          avatar,
        },
        { loggedInUser }
      ) => {
        let avatarUrl = null;
        if (avatar) {
          const { filename, createReadStream } = await avatar;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = fs.createWriteStream(
            `${process.cwd()}/uploads/${newFilename}`
          );
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:${process.env.PORT}/static/${newFilename}`;
        }

        let newHashedPassword = null;
        if (newPassword) {
          newHashedPassword = await bcrypt.hash(newPassword, +process.env.SALT);
        }

        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            firstName,
            lastName,
            username,
            email,
            bio,
            ...(newHashedPassword && { password: newHashedPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
          },
        });
        if (!updatedUser) {
          return {
            ok: false,
            error: "Could not update the profile.",
          };
        }
        return {
          user: updatedUser,
          ok: true,
        };
      }
    ),
  },
};
