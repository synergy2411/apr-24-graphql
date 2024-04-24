import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";

const users = [
  { id: "u001", name: "Monica Geller", age: 22 },
  { id: "u002", name: "Rachel Green", age: 24 },
  { id: "u003", name: "Chandler Bing", age: 23 },
];

const posts = [
  { id: "p001", title: "GraphQL 101", body: "for beginners", published: false },
  {
    id: "p002",
    title: "Mastering GraphQL",
    body: "for advanced developers",
    published: true,
  },
  {
    id: "p003",
    title: "React for Beginners",
    body: "frontend library",
    published: false,
  },
  {
    id: "p004",
    title: "Mastering NodeJS",
    body: "for server side scripting",
    published: true,
  },
];

const typeDefs = /* GraphQL */ `
  type Query {
    users(searchTerm: String): [User!]!
    posts(search: String): [Post!]!
  }
  type User {
    id: ID!
    name: String!
    age: Int!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

const resolvers = {
  Query: {
    users: (parent, args, context, info) => {
      if (args.searchTerm.trim() !== "") {
        return users.filter((user) =>
          user.name.toLowerCase().includes(args.searchTerm.toLowerCase())
        );
      }
      return users;
    },
    posts: () => {
      return posts;
    },
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
