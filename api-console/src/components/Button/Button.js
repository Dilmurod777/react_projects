import React from 'react';
import classes from './Button.module.css'

const Button = (props) => {
  const spinner = (
    <div className={classes.Button_center}>
      <div className={classes.AuthButton}>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
        <div/>
      </div>
    </div>
  )

  let classList = [classes.Button]

  if(!props.isValid){
    classList.push(classes.Button_disabled)
  }

  if(props.addMargin){
    classList.push(classes.Button_margin)
  }

  return (
    <div
      className={classList.join(' ')}
      onClick={props.onClick}
    >
      {
        props.loading
          ? spinner
          : <p>{props.title}</p>
      }
    </div>
  );
};

export default Button;
