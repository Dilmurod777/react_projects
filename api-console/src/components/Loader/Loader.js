import React from 'react';
import classes from './Loader.module.css'

const Loader = ({type = 'dark'}) => {
  const classList = []

  if (type === 'dark') {
    classList.push(classes.Loader_black)
  } else if (type === 'light') {
    classList.push(classes.Loader_white)
  }

  return (
    <div className={classes.center}>
      <div className={classes.Loader}>
        <div className={classList.join(' ')}/>
        <div className={classList.join(' ')}/>
        <div className={classList.join(' ')}/>
        <div className={classList.join(' ')}/>
        <div className={classList.join(' ')}/>
        <div className={classList.join(' ')}/>
        <div className={classList.join(' ')}/>
        <div className={classList.join(' ')}/>
        <div className={classList.join(' ')}/>
        <div className={classList.join(' ')}/>
        <div className={classList.join(' ')}/>
        <div className={classList.join(' ')}/>
      </div>
    </div>
  );
};

export default Loader;
