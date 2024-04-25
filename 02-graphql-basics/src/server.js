import { GraphQLError } from "graphql";
import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { v4 } from "uuid";

import db from "./model/db.js";

const typeDefs = /* GraphQL */ `
  type Mutation {
    createUser(data: CreateUserInput): User!
    deleteUser(userId: ID!): User!
    updateUser(data: UpdateUserInput): User!
    createPost(data: CreatePostInput): Post!
    deletePost(postId: ID!): Post!
    createComment(data: CreateCommentInput): Comment!
    deleteComment(commentId: ID!): Comment!
  }

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
    comments: [Comment!]!
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
    creator: User!
  }

  input CreateUserInput {
    name: String!
    age: Int!
  }

  input CreatePostInput {
    title: String!
    body: String!
    authorId: ID!
  }

  input CreateCommentInput {
    text: String!
    postId: ID!
    creatorId: ID!
  }

  input UpdateUserInput {
    name: String
    age: Int
    userId: ID!
  }
`;

const resolvers = {
  Mutation: {
    createUser: (parent, args, { db }, info) => {
      const { name, age } = args.data;

      const isMatch = db.users.some(
        (user) => user.name.toLowerCase() === name.toLowerCase()
      );
      if (isMatch) {
        throw new GraphQLError("Name already taken.");
      }

      let newUser = {
        id: v4(),
        name,
        age,
      };

      db.users.push(newUser);

      return newUser;
    },
    deleteUser: (parent, args, { db }, info) => {
      const { userId } = args;

      const position = db.users.findIndex((user) => user.id === userId);

      if (position === -1) {
        throw new GraphQLError("User does not exists for " + userId);
      }

      db.comments = db.comments.filter((comment) => comment.creator !== userId);

      db.posts = db.posts.filter((post) => {
        const matchedUser = post.author === userId;

        if (matchedUser) {
          db.comments = db.comments.filter(
            (comment) => comment.post !== post.id
          );
        }
        return !matchedUser;
      });

      const [deletedUser] = db.users.splice(position, 1);

      return deletedUser;
    },
    updateUser: (parent, args, { db }, info) => {
      const { name, age, userId } = args.data;

      const position = db.users.findIndex((user) => user.id === userId);
      if (position === -1) {
        throw new GraphQLError("Unable to find user for " + userId);
      }

      if (typeof name === "string") {
        db.users[position].name = name;
      }

      if (typeof age === "number") {
        db.users[position].age = age;
      }

      return db.users[position];
    },
    createPost: (parent, args, { db }, info) => {
      const { title, body, authorId } = args.data;
      const isMatched = db.users.some((user) => user.id === authorId);

      if (!isMatched) {
        throw new GraphQLError("Author does not exist.");
      }

      let newPost = {
        id: v4(),
        title,
        body,
        published: false,
        author: authorId,
      };
      db.posts.push(newPost);
      return newPost;
    },
    deletePost: (parent, args, { db }, info) => {
      const { postId } = args;

      const position = db.posts.findIndex((post) => post.id === postId);

      if (position === -1) {
        throw new GraphQLError("Unable to find post for ID - " + postId);
      }

      db.comments = db.comments.filter((comment) => comment.post !== postId);

      const [deletedPost] = db.posts.splice(position, 1);

      return deletedPost;
    },
    createComment: (parent, args, { db }, info) => {
      const { text, postId, creatorId } = args.data;

      const userMatched = db.users.some((user) => user.id === creatorId);
      if (!userMatched) {
        throw new GraphQLError("Unable to locate the Creator");
      }

      const postMatched = db.posts.some((post) => post.id === postId);
      if (!postMatched) {
        throw new GraphQLError("Post not found");
      }

      let newComment = {
        id: v4(),
        text,
        creator: creatorId,
        post: postId,
      };

      db.comments.push(newComment);

      return newComment;
    },
    deleteComment: (parent, args, { db }, info) => {
      const { commentId } = args;

      const position = db.comments.findIndex(
        (comment) => comment.id === commentId
      );

      if (position === -1) {
        throw new GraphQLError("Comment ID does not exists - " + commentId);
      }

      const [deletedComment] = db.comments.splice(position, 1);

      return deletedComment;
    },
  },
  Query: {
    users: (parent, args, { db }, info) => {
      console.log("DB ---> ", db);
      if (args.searchTerm && args.searchTerm.trim() !== "") {
        return db.users.filter((user) =>
          user.name.toLowerCase().includes(args.searchTerm.toLowerCase())
        );
      }
      return db.users;
    },
    posts: (parent, args, { db }, info) => {
      if (args.searchTerm && args.searchTerm.trim() !== "") {
        return db.posts.filter(
          (post) =>
            post.title.toLowerCase().includes(args.searchTerm.toLowerCase()) ||
            post.body.toLowerCase().includes(args.searchTerm.toLowerCase())
        );
      }

      if (args.published) {
        return db.posts.filter((post) => post.published);
      }
      return db.posts;
    },
    comments: (parent, args, { db }, info) => {
      return db.comments;
    },
  },
  User: {
    posts: (parent, args, { db }, info) => {
      return db.posts.filter((post) => post.author === parent.id);
    },
    comments: (parent, args, { db }, info) => {
      return db.comments.filter((comment) => comment.creator === parent.id);
    },
  },
  Post: {
    author: (parent, args, { db }, info) => {
      return db.users.find((user) => user.id === parent.author);
    },
    comments: (parent, args, { db }, info) => {
      return db.comments.filter((comment) => comment.post === parent.id);
    },
  },
  Comment: {
    post: (parent, args, { db }, info) => {
      return db.posts.find((post) => post.id === parent.post);
    },
    creator: (parent, args, { db }, info) => {
      return db.users.find((user) => user.id === parent.creator);
    },
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  context: {
    db,
  },
});

const server = createServer(yoga);

server.listen(4040, () =>
  console.log("Graphql Server is running on PORT : 4040")
);
