import './Footer.scss'
import {FaChevronLeft, FaChevronRight} from "react-icons/all";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NextPlaceAction, PrevPlaceAction} from "../../store/actions/actionCreators";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const dispatch = useDispatch()
  const isWeatherFetching = useSelector(state => state.isWeatherLoading)

  const getFormattedTime = () => {
    return ("0" + currentTime.getHours()).slice(-2)
      + ':' + ("0" + currentTime.getMinutes()).slice(-2)
  }

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
  }, [])

  return <div className="Footer">
    {isWeatherFetching
      ? <div className="SwitchButtons"/>
      : <div className="SwitchButtons">
        <FaChevronLeft
          color="#707070"
          size="26"
          onClick={() => dispatch(PrevPlaceAction())}
        />
        <FaChevronRight
          color="#707070"
          size="26"
          onClick={() => dispatch(NextPlaceAction())}
        />
      </div>}

    <p className="CurrentTime">{getFormattedTime()}</p>
  </div>
}

export default Footer
