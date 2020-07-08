import React from 'react';
import classes from './Input.module.css'

const Input = (props) => {
  const classList = [classes.Input]

  if(!props.isValid && props.touched){
    classList.push(classes.Input_invalid)
  }

  return (
    <div className={classList.join(' ')}>
      <div className={classes.Input__labels}>
        <label
          htmlFor={props.id}
          className={classes.Input__label}
        >
          {props.label}
        </label>

        {
          props.optional
            ? <p className={classes.Input__labels__p_optional}>Опционально</p>
            : null
        }
      </div>

      <input
        type={props.type}
        id={props.id}
        className={classes.Input__input}
        placeholder={props.placeholder || ''}
        onChange={(event) => props.onChange(props.id, event.target.value)}
      />
    </div>
  );
};

export default Input;
