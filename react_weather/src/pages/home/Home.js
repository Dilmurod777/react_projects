import {Fragment, useState, useEffect} from "react";
import {RiCelsiusFill, RiFahrenheitFill, BsArrowRepeat} from "react-icons/all";
import {Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

import './Home.scss'
import background from '../../assets/images/background.png'
import axios from "axios";
import {WEATHER_URL} from "../../data/api_urls";
import {WEATHER_API_KEY} from "../../data/api_keys";
import {SetDegreeType, SetDegreeValue, SetWeatherLoading} from "../../store/actions/actionCreators";

const Home = () => {
  const [isConverting, setIsConverting] = useState(false)
  const dispatch = useDispatch()
  const isWeatherLoading = useSelector(state => state.isWeatherLoading)
  const place = useSelector(state => state.place)
  const degreeType = useSelector(state => state.degreeType)
  const degreeValue = useSelector(state => state.degreeValue)

  const fetchWeatherData = async () => {
    const result = await axios.get(`${WEATHER_URL}?q=${place.toLowerCase()}&appid=${WEATHER_API_KEY}&units=metric`)

    if (result.status === 200) {
      dispatch(SetDegreeValue(Math.round(result.data['main']['temp'])))
    } else {
      console.log("Error with code: " + result.status)
    }
  }

  const changeWeatherType = () => {
    if (isConverting) return

    setIsConverting(true)

    if (degreeType === 'celsius') {
      dispatch(SetDegreeType('fahrenheit'))
      dispatch(SetDegreeValue(Math.round((degreeValue * 9 / 5 + 32))))
    } else {
      dispatch(SetDegreeType('celsius'))
      dispatch(SetDegreeValue(Math.round((degreeValue - 32) * 5 / 9)))
    }

    setIsConverting(false)
  }

  useEffect(() => {
    dispatch(SetWeatherLoading(true))
    fetchWeatherData().then(() => {
      setTimeout(() => {
        dispatch(SetWeatherLoading(false));
      }, 500)
    })

  }, [place])

  return <div className="Home">
    {isWeatherLoading
      ? <div className="Loader">
        <Spinner animation="grow" variant="secondary"/>
      </div>
      : <Fragment>
        <img src={background} alt="Background" className="Background"/>

        <p className="CityName">{place}</p>

        <div className="CurrentWeather">
          <p className="Value">
            {degreeValue}
            {degreeType === "celsius"
              ? <RiCelsiusFill size="28"/>
              : <RiFahrenheitFill size="28"/>}
          </p>

          <div className="DegreeSettings" onClick={changeWeatherType}>
            <BsArrowRepeat size="28"/>
          </div>
        </div>
      </Fragment>}
  </div>
}

export default Home
