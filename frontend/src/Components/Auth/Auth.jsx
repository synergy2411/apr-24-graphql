import { useEffect, useState } from "react";
import AddPostForm from "../Posts/AddPostForm";
import LoginForm from "./LoginForm";

function Auth() {
  const [token, setToken] = useState(null);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [toggle]);

  const toggleHandler = () => setToggle(!toggle);

  return (
    <>
      {token && <AddPostForm />}
      {!token && <LoginForm toggleHandler={toggleHandler} />}
    </>
  );
}

export default Auth;
