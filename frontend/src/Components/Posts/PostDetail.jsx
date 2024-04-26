function PostDetail({ post }) {
  return (
    <div className="col-4">
      <div className="card">
        <div className="card-header">
          <h5 className="text-center">{post.title.toUpperCase()}</h5>
        </div>
        <div className="card-body">
          <p>{post.body}</p>
          <p>Author : {post.author.name}</p>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
