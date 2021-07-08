import './Playlists.css';

import RoundPlaylist from "./components/round_playlist/RoundPlaylist";
import SquarePlaylist from "./components/square_playlist/SquarePlaylist";

const Playlists = ({title, playlists}) => {
  return (
    <div className="Playlists">
      <h1>{title}</h1>

      <div className="Content">
        {playlists.map(playlist => {
          if (playlist.type === "circle") {
            return <RoundPlaylist playlist={playlist}/>
          } else if (playlist.type === 'square') {
            return <SquarePlaylist playlist={playlist}/>
          } else {
            return <div/>
          }
        })}
      </div>
    </div>
  )
}

export default Playlists
