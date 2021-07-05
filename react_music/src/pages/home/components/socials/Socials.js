import './Socials.scss'
import {FaApple, FaFacebookSquare, FaInstagram, FaSoundcloud, FaSpotify, FaTwitter, FaYoutube} from "react-icons/all";

const Socials = () => {
  const color = "white"
  const size = 28

  return <div className="Socials">
    <FaSoundcloud color={color} size={size}/>
    <FaSpotify color={color} size={size}/>
    <FaYoutube color={color} size={size}/>
    <FaApple color={color} size={size}/>
    <FaInstagram color={color} size={size}/>
    <FaFacebookSquare color={color} size={size}/>
    <FaTwitter color={color} size={size}/>
  </div>
}

export default Socials
