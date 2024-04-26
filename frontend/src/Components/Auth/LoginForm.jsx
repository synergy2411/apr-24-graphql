import { useMutation } from "@apollo/client";
import { useRef } from "react";
import USER_LOGIN from "../../apollo/userLogin";

function LoginForm({ toggleHandler }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [userLoginMutation, { error }] = useMutation(USER_LOGIN);

  const submitHandler = (event) => {
    event.preventDefault();
    userLoginMutation({
      variables: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    }).then(({ data }) => {
      localStorage.setItem("token", data.userLogin.token);
      toggleHandler();
    });
  };

  return (
    <>
      <h1 className="text-center">User Login Page</h1>
      {error && (
        <div className="alert alert-danger">
          <p>{error.message}</p>
        </div>
      )}

      <form onSubmit={submitHandler}>
        {/* email */}
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            placeholder=""
            ref={emailRef}
          />
          <label htmlFor="email">Email</label>
        </div>

        {/* password */}
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            placeholder=""
            ref={passwordRef}
          />
          <label htmlFor="password">Password</label>
        </div>

        {/* buttons */}
        <div className="row">
          <div className="col-6">
            <div className="d-grid">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
          </div>
          <div className="col-6">
            <div className="d-grid">
              <button className="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
