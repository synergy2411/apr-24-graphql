import { GraphQLError, graphql } from "graphql";
import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { v4 } from "uuid";

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
  { id: "c001", text: "Awesome book", post: "p004", creator: "u002" },
  { id: "c002", text: "I Like it", post: "p002", creator: "u003" },
  { id: "c003", text: "Eager to read", post: "p004", creator: "u001" },
  { id: "c004", text: "Luv it ❤️❤️", post: "p001", creator: "u001" },
];

const typeDefs = /* GraphQL */ `
  type Mutation {
    createUser(data: CreateUserInput): User!
    createPost(data: CreatePostInput): Post!
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
`;

const resolvers = {
  Mutation: {
    createUser: (parent, args, context, info) => {
      const { name, age } = args.data;

      const isMatch = users.some(
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

      users.push(newUser);

      return newUser;
    },
    createPost: (parent, args, context, info) => {
      const { title, body, authorId } = args.data;
      const isMatched = users.some((user) => user.id === authorId);

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
      posts.push(newPost);
      return newPost;
    },
    createComment: (parent, args, context, info) => {
      const { text, postId, creatorId } = args.data;

      const userMatched = users.some((user) => user.id === creatorId);
      if (!userMatched) {
        throw new GraphQLError("Unable to locate the Creator");
      }

      const postMatched = posts.some((post) => post.id === postId);
      if (!postMatched) {
        throw new GraphQLError("Post not found");
      }

      let newComment = {
        id: v4(),
        text,
        creator: creatorId,
        post: postId,
      };

      comments.push(newComment);

      return newComment;
    },
    deleteComment: (parent, args, context, info) => {
      const { commentId } = args;

      const position = comments.findIndex(
        (comment) => comment.id === commentId
      );

      if (position === -1) {
        throw new GraphQLError("Comment ID does not exists - " + commentId);
      }

      const [deletedComment] = comments.splice(position, 1);

      return deletedComment;
    },
  },
  Query: {
    users: (parent, args, context, info) => {
      if (args.searchTerm && args.searchTerm.trim() !== "") {
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
    comments: (parent, args, context, info) => {
      return comments.filter((comment) => comment.creator === parent.id);
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
    creator: (parent, args, context, info) => {
      return users.find((user) => user.id === parent.creator);
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
