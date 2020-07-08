import React from 'react';
import classes from './ButtonFormat.module.css'
import {connect} from "react-redux";
import {formatInputData} from "../../store/actions/console";


const ButtonFormat = (props) => {
  return (
    <div className={classes.ButtonFormat} onClick={props.formatInputData}>
      <div className={classes.ButtonFormat__icon}>
        <div className={classes.ButtonFormat__bar}/>
        <div className={classes.ButtonFormat__bar}/>
        <div className={classes.ButtonFormat__bar}/>
        <div className={classes.ButtonFormat__bar}/>
      </div>
      <p>Форматировать</p>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    formatInputData: () => dispatch(formatInputData())
  }
}

export default connect(null, mapDispatchToProps)(ButtonFormat);
