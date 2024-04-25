import { GraphQLError } from "graphql";
import { v4 } from "uuid";

let Mutation = {
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
        db.comments = db.comments.filter((comment) => comment.post !== post.id);
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
};

export default Mutation;
