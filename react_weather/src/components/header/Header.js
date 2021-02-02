import './Header.scss'
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {BsGrid3X3GapFill, BsSearch} from "react-icons/all";

import Logo from "../logo/Logo";
import {GOOGLE_API_KEY} from "../../data/api_keys";
import {PROXY_URL, SEARCH_CITY_URL} from "../../data/api_urls";
import {useDispatch} from "react-redux";
import {SetPlace} from "../../store/actions/actionCreators";

const Header = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const dispatch = useDispatch()

  const onCityClickHandler = (city) => {
    const newCity = city.split(', ')

    setSearchResults([])
    dispatch(SetPlace(newCity[0], false))
  }

  const onInputChangeHandler = async (event) => {
    const value = event.target.value

    if (value !== null && value !== '') {
      const newValue = value[0].toUpperCase() + value.slice(1)
      setSearchValue(newValue)

      // fetchCities(newValue).then()

    } else {
      setSearchValue('')
      setSearchResults([])
    }
  }

  const fetchCities = async () => {
    if (isFetching) return;

    setIsFetching(true)

    try {
      const response = await axios(
        {
          "async": true,
          "crossDomain": true,
          "url": `${PROXY_URL}${SEARCH_CITY_URL}?input=${searchValue}&types=(cities)&key=${GOOGLE_API_KEY}`,
          "method": "GET",
          "headers": {
            "Content-Type": "application/json",
            "Accept": "*/*",
          },
        }
      )

      if (response.status === 200) {
        setSearchResults(response.data['predictions'].slice(0, 5))
      } else {
        console.log("Error of searching: " + response.status)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetching(false)
    }
  }

  return <div className="Header">
    <Logo/>

    <div className="RightSection">
      <Link to="/popular">
        <BsGrid3X3GapFill size="22" color='black'/>
      </Link>

      <div className="SearchBar">
        <input
          type="text"
          value={searchValue}
          onChange={onInputChangeHandler}
        />
        <BsSearch size="20" onClick={fetchCities}/>

        <div className="SearchResults">
          {searchResults.map((city, index) => (
            <p key={index} onClick={() => onCityClickHandler(city['description'])}>
              {city['description']}
            </p>
          ))}
        </div>
      </div>
    </div>
  </div>
}

export default Header
