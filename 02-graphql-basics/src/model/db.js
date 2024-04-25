let users = [
  { id: "u001", name: "Monica Geller", age: 22 },
  { id: "u002", name: "Rachel Green", age: 24 },
  { id: "u003", name: "Chandler Bing", age: 23 },
];

let posts = [
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

let comments = [
  { id: "c001", text: "Awesome book", post: "p004", creator: "u002" },
  { id: "c002", text: "I Like it", post: "p002", creator: "u003" },
  { id: "c003", text: "Eager to read", post: "p004", creator: "u001" },
  { id: "c004", text: "Luv it ❤️❤️", post: "p001", creator: "u002" },
];

const db = { users, posts, comments };

export default db;
