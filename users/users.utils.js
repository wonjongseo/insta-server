import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (!user) return null;

    return user;
  } catch (e) {
    return null;
  }
};

export const protectResolvers = (resolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: "Please Login.",
    };
  }
  return resolver(root, args, context, info);
};
