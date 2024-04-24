import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";

// Scalar Types - ID, String, Int, Float, Boolean

const typeDefs = `
    type Query {
        hello : String!
        productId : ID!
        quantity : Int!
        isAvailable : Boolean!
    }
`;

const resolvers = {
  Query: {
    hello: () => "World!!",
    productId: () => "P001",
    quantity: () => 301,
    isAvailable: () => true,
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
