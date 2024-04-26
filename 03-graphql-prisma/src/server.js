import { createServer } from "node:http";
import { GraphQLError } from "graphql";
import { createSchema, createYoga } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import { loadFile } from "graphql-import-files";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { compareSync, hashSync } = bcrypt;
const { sign, verify } = jwt;
const SECRET_KEY = "MY_SUPER_SECRET_KEY";

// import resolvers from "./resolvers/index.js";

// const prisma = new PrismaClient({ log: ["query"] });
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    posts: async () => {
      try {
        const allPosts = await prisma.post.findMany({
          include: {
            author: {
              select: {
                id: true,
                name: true,
                age: true,
                email: true,
                role: true,
              },
            },
          },
        });

        return allPosts;
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
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
    userLogin: async (parent, args, context, info) => {
      try {
        const { email, password } = args.data;
        const foundUser = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!foundUser) {
          throw new GraphQLError("Unable to find user for " + email);
        }

        const isMatch = compareSync(password, foundUser.password);

        if (!isMatch) {
          throw new GraphQLError("Password does not match, Try again!");
        }

        //   generate token
        const token = sign({ id: foundUser.id }, SECRET_KEY);

        return { token };
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
    createPost: async (parent, args, { token }, info) => {
      try {
        if (token === null) {
          throw new GraphQLError(
            "Token required to create Post. Please Login first."
          );
        }
        const { id } = verify(token, SECRET_KEY);

        const { title, body } = args.data;

        const createdPost = await prisma.post.create({
          data: {
            title,
            body,
            published: false,
            authorId: id,
          },
        });

        return createdPost;
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
      context: ({ request }) => {
        const authHeader = request.headers.get("authorization");
        let token = null;
        if (authHeader != null) {
          // "Bearer Token_value" -> ["Bearer", "Token_value"]
          token = authHeader.split(" ")[1];
        }
        return {
          token,
        };
      },
    });

    const server = createServer(yoga);

    server.listen(4040, () => console.log("Server started on PORT : 4040"));
  };

  startServer();
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
