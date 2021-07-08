import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH, faPlay, faPlus} from '@fortawesome/free-solid-svg-icons';

import './Flows.css';
import Flow from "./components/flow/FLow";

import Flow1 from '../../assets/images/flow1.png';
import Flow2 from '../../assets/images/flow2.png';
import Flow3 from '../../assets/images/flow3.png';
import FlowBg1 from '../../assets/images/flow_bg1.png';
import FlowBg2 from '../../assets/images/flow_bg2.png';
import FlowBg3 from '../../assets/images/flow_bg3.png';

const Flows = () => {
  return (
    <div className="Flows">
      <div className="Title">
        <p>Flow</p>
        <FontAwesomeIcon icon={faEllipsisH}/>
      </div>

      <div className="Content">
        <Flow
          title={'Your Personal Soundtrack'}
          description={'Based on your listening history'}
          icon={faPlay}
          image={Flow1}
          bg_image={FlowBg1}
        />

        <Flow
          title={'Create your own perfect soundtrack'}
          description={'Select multiple genres and moods to create the perfect soundtrack'}
          icon={faPlus}
          image={Flow2}
          bg_image={FlowBg2}
        />

        <Flow
          title={'Create your own concert with your favorite singers'}
          description={'Select multiple artists to create the perfect soundtrack'}
          icon={faPlus}
          image={Flow3}
          bg_image={FlowBg3}
        />
      </div>
    </div>
  )
}

export default Flows;
