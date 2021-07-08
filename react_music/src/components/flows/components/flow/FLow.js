import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import './Flow.css';

const Flow = ({title, image, bg_image, icon, description}) => {
  return (
    <div className="Flow">
      <img src={bg_image} alt='' className="BgImage"/>
      <div className="Content">
        <div className="Left">
          <img src={image} alt=''/>
          <div className="Icon">
            <FontAwesomeIcon icon={icon}/>
          </div>
        </div>

        <div className="Right">
          <div className="Title">
            <h1>Flow</h1>
            <p>{title}</p>
          </div>

          <p className="Description">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default Flow;
