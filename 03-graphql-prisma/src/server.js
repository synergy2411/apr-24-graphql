import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import { loadFile } from "graphql-import-files";
import resolvers from "./resolvers/index.js";

const prisma = new PrismaClient();

async function main() {
  const startServer = () => {
    const schema = createSchema({
      typeDefs: loadFile("./src/schema.graphql"),
      resolvers,
    });

    const yoga = createYoga({ schema });

    const server = createServer(yoga);

    server.listen(4040, () => console.log("Server started on PORT : 4040"));
  };

  startServer();
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
