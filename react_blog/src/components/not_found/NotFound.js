import {Link} from "react-router-dom";

import './NotFound.css'

const NotFound = () => {
  return (
    <div className="NotFound">
      <h2>Sorry</h2>
      <p>That page cannot be found.</p>
      <Link to={"/"}>Back to Homepage</Link>
    </div>
  )
}

export default NotFound;
