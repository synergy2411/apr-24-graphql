import { gql } from "@apollo/client";
const FETCH_POSTS = gql`
  query {
    posts {
      id
      title
      body
      published
      author {
        id
        name
      }
    }
  }
`;

export default FETCH_POSTS;
