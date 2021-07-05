import {Link} from "react-router-dom";

import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="Navbar">
      <Link to={'/'}>
        <h1>React Blog</h1>
      </Link>
      <div className="Links">
        <Link to="/">Home</Link>
        <Link to="/create">New Post</Link>
      </div>
    </nav>
  );
}

export default Navbar;
