import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";

const users = [
  { id: "u001", name: "Monica Geller", age: 22 },
  { id: "u002", name: "Rachel Green", age: 24 },
  { id: "u003", name: "Chandler Bing", age: 23 },
];

const posts = [
  {
    id: "p001",
    title: "GraphQL 101",
    body: "for beginners",
    published: false,
    author: "u001",
  },
  {
    id: "p002",
    title: "Mastering GraphQL",
    body: "for advanced developers",
    published: true,
    author: "u002",
  },
  {
    id: "p003",
    title: "React for Beginners",
    body: "frontend library",
    published: false,
    author: "u001",
  },
  {
    id: "p004",
    title: "Mastering NodeJS",
    body: "for server side scripting",
    published: true,
    author: "u003",
  },
];

const comments = [
  { id: "c001", text: "Awesome book", post: "p004" },
  { id: "c002", text: "I Like it", post: "p002" },
  { id: "c003", text: "Eager to read", post: "p004" },
  { id: "c004", text: "Luv it ❤️❤️", post: "p001" },
];

const typeDefs = /* GraphQL */ `
  type Query {
    users(searchTerm: String): [User!]!
    posts(searchTerm: String, published: Boolean): [Post!]!
    comments: [Comment!]!
  }
  type User {
    id: ID!
    name: String!
    age: Int!
    posts: [Post!]!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }
  type Comment {
    id: ID!
    text: String!
    post: Post!
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
    posts: (parent, args, context, info) => {
      if (args.searchTerm && args.searchTerm.trim() !== "") {
        return posts.filter(
          (post) =>
            post.title.toLowerCase().includes(args.searchTerm.toLowerCase()) ||
            post.body.toLowerCase().includes(args.searchTerm.toLowerCase())
        );
      }

      if (args.published) {
        return posts.filter((post) => post.published);
      }
      return posts;
    },
    comments: (parent, args, context, info) => {
      return comments;
    },
  },
  User: {
    posts: (parent, args, context, info) => {
      return posts.filter((post) => post.author === parent.id);
    },
  },
  Post: {
    author: (parent, args, context, info) => {
      return users.find((user) => user.id === parent.author);
    },
    comments: (parent, args, context, info) => {
      return comments.filter((comment) => comment.post === parent.id);
    },
  },
  Comment: {
    post: (parent, args, context, info) => {
      return posts.find((post) => post.id === parent.post);
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
