import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import { loadFile } from "graphql-import-files";
import { GraphQLError } from "graphql";
import bcrypt from "bcryptjs";

const { compareSync, hashSync } = bcrypt;
// import resolvers from "./resolvers/index.js";

// const prisma = new PrismaClient({ log: ["query"] });
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    hello: () => "Hello Again!",
  },
  Mutation: {
    userRegistration: async (parent, args, context, info) => {
      try {
        let { name, age, email, password, role } = args.data;
        role = role || "ANALYST";
        const hashedPassword = hashSync(password, 12);
        const createdUser = await prisma.user.create({
          data: {
            name,
            age,
            email,
            password: hashedPassword,
            role,
          },
        });
        return createdUser;
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
  },
};

async function main() {
  const startServer = () => {
    const schema = createSchema({
      typeDefs: loadFile("./src/schema.graphql"),
      resolvers,
    });

    const yoga = createYoga({
      schema,
    });

    const server = createServer(yoga);

    server.listen(4040, () => console.log("Server started on PORT : 4040"));
  };

  startServer();
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
