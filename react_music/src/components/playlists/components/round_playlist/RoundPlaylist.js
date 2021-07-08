import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";

import './RoundPlaylist.css';

const RoundPlaylist = ({playlist}) => {
  return (
    <div className="RoundPlaylist">
      <div className="Image">
        <img src={require(playlist.image)} alt={playlist.title}/>
      </div>

      <h1>{playlist.title}</h1>
      {playlist.showLikes && (
        <div className="Likes">
          <FontAwesomeIcon icon={faHeart}/>
          <p>{Intl.NumberFormat().format(playlist.likes)}</p>
        </div>
      )}
    </div>
  )
}

export default RoundPlaylist;
