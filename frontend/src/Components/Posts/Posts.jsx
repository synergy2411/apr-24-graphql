import { gql, useQuery } from "@apollo/client";

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
    <>
      <h1 className="text-center">All Posts</h1>

      <ul>
        {data &&
          data.posts.map((post) => (
            <li key={post.id}>{post.title.toUpperCase()}</li>
          ))}
      </ul>
    </>
  );
}

export default Posts;
