import React from 'react';
import classes from "./Logo.module.css";

const Logo = () => {
  return (
    <div>
      <div className={classes.Logo}>
        <img src="./assets/images/logo.png" alt="logo"/>
      </div>
    </div>
  );
};

export default Logo;
