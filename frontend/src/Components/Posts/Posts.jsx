import { useQuery, useLazyQuery } from "@apollo/client";
import FETCH_POSTS from "../../apollo/fetchPosts";
import PostDetail from "./PostDetail";
import { useEffect } from "react";

function Posts() {
  // const { data, loading, error } = useQuery(FETCH_POSTS);
  const [queryFunction, { data, error, loading }] = useLazyQuery(FETCH_POSTS);

  useEffect(() => {
    queryFunction();
  }, [queryFunction]);

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
