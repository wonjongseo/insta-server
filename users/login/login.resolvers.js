import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { USER_NOT_FOUND } from "../../exception";

// create secret key =https://randomkeygen.com

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      const foundUser = await client.user.findUnique({ where: { username } });
      if (!foundUser) return USER_NOT_FOUND;

      const isPasswordOK = await bcrypt.compare(password, foundUser.password);
      if (!isPasswordOK)
        return {
          ok: false,
          error: "パスワードが間違っています",
        };

      const token = jwt.sign({ id: foundUser.id }, process.env.SECRET_KEY);

      return {
        ok: true,
        token,
      };
    },
  },
};
