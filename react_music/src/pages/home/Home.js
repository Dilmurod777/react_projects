import {useState, useEffect, Fragment} from "react";
import axios from "axios";
import {
  BiMenuAltRight,
  FaPlay,
  GiSoundWaves
} from "react-icons/all";
import {Spinner} from "react-bootstrap";

import './Home.scss'
import Socials from "./components/socials/Socials";
import {AUDIODB_API_URL} from "../../data/api_urls";
import {useDispatch, useSelector} from "react-redux";
import {AddArtists} from "../../store/actions/actionCreators";


const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [activeArtist, setActiveArtist] = useState(0)
  const artists = useSelector(state => state.artists)
  const dispatch = useDispatch()

  const pageClickHandler = (index) => {
    setActiveArtist(index)
  }

  const fetchArtist = async (name) => {
    const response = await axios.get(`${AUDIODB_API_URL}/search.php?s=${name}`)
    if (response.status === 200) {
      if (response.data['artists'].length > 0) {
        const artist = response.data['artists'][0]

        return {
          'id': artist['idArtist'],
          'website': artist['strWebsite'],
          'facebook': artist['strFacebook'],
          'twitter': artist['strTwitter'],
          'bio': artist['strBiographyEN'],
          'thumb': artist['strArtistThumb'],
        }
      }
    } else {
      console.log("Error while fetching: " + response.status)
    }
  }

  const fetchArtists = async () => {
    const newArtists = {
      ...artists
    }

    for (let artist of Object.keys(artists)) {
      newArtists[artist] = await fetchArtist(artist)
    }

    dispatch(AddArtists(newArtists))
  }

  useEffect(() => {
    setIsLoading(true)
    fetchArtists().then(() => {
      setIsLoading(false)
    })
  }, [])

  return <div className="Home">
    {isLoading
      ? <div className="Loader">
        <Spinner animation="grow" variant="dark"/>
      </div>
      : <Fragment>
        <div className="Slider">
          {Object.keys(artists).map((name, index) => {
            const artist = artists[name]
            let classes = ['Background']

            if (index === activeArtist) {
              classes.push("Active")
            }

            return <div className={classes.join(' ')} key={index}>
              <img src={artist['thumb']} alt={name}/>
            </div>
          })}
        </div>

        <div className="ArtistInfo">
          <h1>{Object.keys(artists)[activeArtist]}</h1>
          <div className="Description">
            <p>{artists[Object.keys(artists)[activeArtist]]['bio']}</p>
          </div>
        </div>

        <div className="Playlist">
          <p className="Title">Playlist</p>
          <p className="Subtitle">top 10 songs</p>

          <div className="Listen">
            <p>Listen now</p>
            <FaPlay color="white" size="20"/>
          </div>
        </div>

        <div className="SoundVolume">
          <GiSoundWaves color="white" size="50"/>
        </div>

        <div className="Menu">
          <BiMenuAltRight size="65" color="rgba(0, 0, 0, 0.8)"/>
        </div>

        <div className="Pages">
          {Object.keys(artists).map((name, index) => {
            let classes = ['']

            if (index === activeArtist) {
              classes.push("Active")
            }

            return (
              <p
                className={classes.join(' ')}
                key={index}
                onClick={() => pageClickHandler(index)}
              >
                {('0' + (index + 1)).slice(-2)}
              </p>
            )
          })}

        </div>

        <Socials/>
      </Fragment>}
  </div>
}

export default Home
