import {useState} from "react";
import './Tiles.css'

const WhiteTile = ({letter, onClick, isKeyPressed}) => {
  const [isActive, setActiveState] = useState(isKeyPressed)

  const style = {
    margin: '0 5px 0 0',
    borderBottom: isActive ? "5px solid black" : "none"
  }

  const addActive = () => {
    setActiveState(true)
  }

  const removeActive = () => {
    setActiveState(false)
  }

  return <div
    className="WhiteTile"
    style={style}
    onMouseDown={() => {
      addActive()
      onClick()
    }}
    onMouseUp={removeActive}
    onMouseLeave={removeActive}>
    <p>{letter}</p>
  </div>
}

export default WhiteTile
