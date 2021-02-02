import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

import "./PopularCities.scss"
import PlaceBox from "./components/PlaceBox/PlaceBox";
import {PROXY_URL, SEARCH_PHOTO_URL, SEARCH_PLACE_URL} from "../../data/api_urls";
import {GOOGLE_API_KEY} from "../../data/api_keys";
import {Spinner} from "react-bootstrap";
import {useHistory} from "react-router";
import {SetPlace} from "../../store/actions/actionCreators";

const PopularCities = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [images, setImages] = useState([])
  const places = useSelector(state => state.places)
  const dispatch = useDispatch()
  const history = useHistory()

  const getImage = async (place) => {
    const placeResult = await axios(
      {
        "async": true,
        "crossDomain": true,
        "url": `${PROXY_URL}${SEARCH_PLACE_URL}?input=${place}&inputtype=textquery&fields=photos&key=${GOOGLE_API_KEY}`,
        "method": "GET",
        "headers": {
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
      }
    )

    if (placeResult.status === 200) {
      // const placeResult = await axios.get(`${PROXY_URL}${SEARCH_PLACE_URL}?input=${place}&inputtype=textquery&fields=photos&key=${GOOGLE_API_KEY}`)
      if (placeResult.data['candidates'][0]['photos'].length > 0) {
        const photoRef = placeResult.data['candidates'][0]['photos'][0]['photo_reference']

        return `${SEARCH_PHOTO_URL}?maxheight=300&maxwidth=300&photoreference=${photoRef}&key=${GOOGLE_API_KEY}`
      } else {
        console.log("No photos")
      }
    } else {
      console.log("Google Place Search Error: " + placeResult.status)
    }
  }

  const getAllImages = async () => {
    let tempImages = []
    for (const place of places) {
      tempImages.push(await getImage(place))
    }

    setImages(tempImages)
  }

  const onPlaceBoxClickHandler = (place) => {
    dispatch(SetPlace(place))
    history.push('/')
  }

  useEffect(() => {
    setIsLoading(true)
    getAllImages().then(() => {
      setIsLoading(false)
    })
  }, [])

  return <div className="PopularCities">
    {isLoading
      ? <div className="Loader">
        <Spinner animation="grow" variant="secondary"/>
      </div>
      : places.map((_, index) => (
        <PlaceBox
          key={index}
          image={images[index]}
          name={places[index]}
          onClick={onPlaceBoxClickHandler}
        />
      ))}
  </div>
}

export default PopularCities
