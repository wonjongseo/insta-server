import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from "./schema";
import { getUser } from "./users/users.utils";
import express from "express";
import logger from "morgan";
import http from "http";

const PORT = process.env.PORT;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: async ({ token }) => {
      if (!token) throw new Error("You cant't listen");
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      };
    },
  },
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },
});

const app = express();
app.use("/static", express.static("uploads"));
app.use(logger("dev"));
server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () =>
  console.log(`🚀 Server is running on http://localhost:${PORT}/`)
);
