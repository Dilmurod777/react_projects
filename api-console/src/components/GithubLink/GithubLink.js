import React from 'react';
import classes from "./GithubLink.module.css"

const GithubLink = ({link, margin=true}) => {
  const classList = [classes.GithubLinkSection]

  if(margin){
    classList.push(classes.GithubLinkSection_margin)
  }

  return (
    <div className={classList.join(' ')}>
      <a
        href={link}
        target='_blank'
        rel='noopener noreferrer'
        className={classes.GithubLinkSection__a}
      >Github Link</a>
    </div>
  );
};

export default GithubLink;
