import { useState } from "react";
import Auth from "../Auth/Auth";
import Posts from "../Posts/Posts";

function Layout() {
  const [tab, setTab] = useState(1);
  return (
    <>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link" href="#/" onClick={() => setTab(1)}>
            All Posts
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#/" onClick={() => setTab(2)}>
            Login
          </a>
        </li>
      </ul>

      <hr />

      {tab === 1 && <Posts />}
      {tab === 2 && <Auth />}
    </>
  );
}

export default Layout;
