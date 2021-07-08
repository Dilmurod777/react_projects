import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowDown, faSearch, faUser} from '@fortawesome/free-solid-svg-icons'

import './Navbar.css';

import Logo from '../../assets/images/logo.png';

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="Left">
        <img src={Logo} alt="logo"/>
        <a href="/">Browse</a>
        <a href="/">Library</a>
        <a href="/" className="Active">Home</a>
      </div>

      <div className="Right">
        <div className="Search">
          <FontAwesomeIcon icon={faSearch} className="SearchIcon"/>
          <input type="text" placeholder="Search"/>
        </div>

        <div className="Account">
          <div className="Avatar">
            <FontAwesomeIcon icon={faUser}/>
          </div>
          <p>JohnDoe</p>
          <FontAwesomeIcon icon={faArrowDown} className="Menu"/>
        </div>
      </div>
    </div>
  )
}

export default Navbar
