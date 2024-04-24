import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";

const typeDefs = `
    type Query {
        hello : String!
    }
`;

const resolvers = {
  Query: {
    hello: () => "World!!",
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
});

const server = createServer(yoga);

server.listen(4040, () =>
  console.log("Graphql Server is running on PORT : 4040")
);
