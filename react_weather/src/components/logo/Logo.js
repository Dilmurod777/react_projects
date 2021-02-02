import './Logo.scss'
import {Link} from "react-router-dom";

const Logo = () => {
  return <div className="Logo">
    <Link to="/">
      <p>.Weather</p>
    </Link>
  </div>
}

export default Logo
