import React from 'react';
import classes from './Alert.module.css'

const Alert = (props) => {
  function errorStringify() {
    let errorString = '{'

    Object.keys(props.error).forEach(el => {
      errorString += `${el}: "${props.error[el]}", `
    })

    errorString += '}'
    return errorString
  }

  return (
    <div className={classes.Alert}>
      <div className={classes.Alert__icon}>
        <img
          src='/assets/images/meh.png'
          alt='icon'
          className={classes.Alert__icon__img}
        />
      </div>

      <div>
        <h1 className={classes.Alert__text__h1__title}>{props.heading}</h1>
        <p className={classes.Alert__text_p_Subtitle}>{errorStringify()}</p>
      </div>
    </div>
  );
};

export default Alert;
