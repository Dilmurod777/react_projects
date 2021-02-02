import './PlaceBox.scss'

const PlaceBox = ({name, image, onClick}) => {
  return <div className="PlaceBox" onClick={() => onClick(name)}>
    <img src={image} alt={name} width="400"/>
    <div className="Backside">
      <p>{name}</p>
    </div>
  </div>
}

export default PlaceBox
