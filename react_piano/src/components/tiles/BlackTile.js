import './Tiles.css'
import {useState} from "react";

const BlackTile = ({letter, index, onClick}) => {

  // 45 => width of white tile
  // 40 => width of black tile
  // 5 => right margin of white tile
  const style = {
    left: index * (45 + 5) - Math.floor(40 / 2) - 5 / 2,
  }

  return <div
    className="BlackTile"
    style={style}
    onMouseDown={onClick}
  >
    <p>{letter}</p>
  </div>
}

export default BlackTile
