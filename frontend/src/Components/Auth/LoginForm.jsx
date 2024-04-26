import { useRef } from "react";

function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("EMAIL : ", emailRef.current.value);
    console.log("PASSWORD : ", passwordRef.current.value);
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
