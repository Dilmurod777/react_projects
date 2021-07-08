import './Home.css';

import Navbar from "../navbar/Navbar";
import Flows from "../flows/FLows";
import Playlists from "../playlists/Playlists";
import PlaylistModel from "../../models/PlaylistModel";

const Home = () => {
  const recentlyPlayed = [
      new PlaylistModel(
        'circle',
        '~/assets/images/playlists/recently/1.png',
        'Queen',
        false
      )
    ];

  return (
    <div className="Home">
      <Navbar/>
      <Flows/>
      <Playlists title={"recently played"} playlists={recentlyPlayed}/>
    </div>
  )
}

export default Home
