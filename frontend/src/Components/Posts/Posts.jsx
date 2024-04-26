import { gql, useQuery } from "@apollo/client";
import PostDetail from "./PostDetail";

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

function Posts() {
  const { data, loading, error } = useQuery(FETCH_POSTS);

  if (error) return <p>{error.message}</p>;

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="container">
      <h1 className="text-center">All Posts</h1>

      <div className="row">
        {data &&
          data.posts.map((post) => <PostDetail post={post} key={post.id} />)}
      </div>
    </div>
  );
}

export default Posts;
