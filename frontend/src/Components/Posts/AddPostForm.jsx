import { gql, useMutation } from "@apollo/client";
import { useRef } from "react";

const CREATE_POST = gql`
  mutation mutationCreatePost($title: String!, $body: String!) {
    createPost(data: { title: $title, body: $body }) {
      id
      title
      body
      published
    }
  }
`;

function AddPostForm() {
  const titleRef = useRef();
  const bodyRef = useRef();
  const [createPostMutation, { error }] = useMutation(CREATE_POST);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(titleRef.current.value, bodyRef.current.value);
    createPostMutation({
      variables: {
        title: titleRef.current.value,
        body: bodyRef.current.value,
      },
    }).then(({ data }) => {
      console.log("DATA : ", data);
    });
  };

  return (
    <>
      {error && <p className="alert alert-danger">{error.message}</p>}
      <h1 className="text-center">Add New Post Here</h1>
      <form onSubmit={submitHandler}>
        {/* title */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="title"
            id="title"
            placeholder=""
            ref={titleRef}
          />
          <label htmlFor="title">Title</label>
        </div>

        {/* body */}

        <div className="mb-3">
          <label htmlFor="" className="form-label"></label>
          <textarea
            className="form-control"
            name="body"
            id="body"
            rows="3"
            ref={bodyRef}
          ></textarea>
        </div>

        {/* buttons */}
        <div className="row">
          <div className="col-6">
            <div className="d-grid">
              <button className="btn btn-primary" type="submit">
                Add Post
              </button>
            </div>
          </div>
          <div className="col-6">
            <div className="d-grid">
              <button className="btn btn-secondary">Reset</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddPostForm;
