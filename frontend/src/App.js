import LoginForm from "./Components/Auth/LoginForm";
import AddPostForm from "./Components/Posts/AddPostForm";
import Posts from "./Components/Posts/Posts";

function App() {
  return (
    <div className="container">
      <h1>App works!</h1>
      {/* <Posts /> */}

      <LoginForm />

      <AddPostForm />
    </div>
  );
}

export default App;
