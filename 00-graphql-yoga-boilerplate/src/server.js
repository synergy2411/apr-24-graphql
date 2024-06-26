import { createSchema, createYoga, createPubSub } from "graphql-yoga";
import { createServer } from "node:http";
import { loadFile } from "graphql-import-files";

import db from "./model/db.js";
import resolvers from "./resolvers/index.js";

const pubsub = createPubSub();

const schema = createSchema({
  typeDefs: loadFile("./src/schema.graphql"),
  resolvers,
});

const yoga = createYoga({
  schema,
  context: {
    db,
    pubsub,
  },
});

const server = createServer(yoga);

server.listen(4040, () =>
  console.log("Graphql Server is running on PORT : 4040")
);
