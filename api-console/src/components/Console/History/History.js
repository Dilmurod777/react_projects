import React from 'react';
import {connect} from "react-redux";
import classes from './History.module.css'

import Request from "./Request/Request";
import {updateHistory} from "../../../store/actions/console";

function mouseWheelMovement(e) {
  const history_elements_div = document.getElementById(classes.History__elements)
  if (e.deltaY > 0) {
    history_elements_div.scrollLeft += 15;
  } else {
    history_elements_div.scrollLeft -= 15;
  }
}

const History = (props) => {
  return (
    <div className={classes.HideScrollbars}>
      <div className={classes.History__request_actions_parent}>
        <div id={classes.History__elements} className={classes.History__elements} onWheel={mouseWheelMovement}>
          {
            props.history.map((request, index) => (
              <Request
                key={index}
                request={request}
                onDeleteClick={props.onDeleteClick}
              />
            ))
          }
        </div>
        <div className={classes.Overlay}/>
      </div>

      <div className={classes.Clear} onClick={props.clearHistory}>
        <img src="./assets/images/history-cross.png" alt=""/>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    history: [...state.console.history]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clearHistory: () => dispatch(updateHistory([])),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
