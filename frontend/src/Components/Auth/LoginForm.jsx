import { useRef } from "react";
import { gql, useMutation } from "@apollo/client";

const USER_LOGIN = gql`
  mutation mutationUserLogin($email: String!, $password: String!) {
    userLogin(data: { email: $email, password: $password }) {
      token
    }
  }
`;

function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [userLoginMutation] = useMutation(USER_LOGIN);

  const submitHandler = (event) => {
    event.preventDefault();
    userLoginMutation({
      variables: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    })
      .then(({ data }) => {
        localStorage.setItem("token", data.userLogin.token);
      })
      .catch(console.error);
  };

  return (
    <>
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
