import React from "react";
import classes from './AnswerItem.module.css'

const AnswerItem = (props) => {
  const classList = [classes.AnswerItem]

  if (props.state) {
    classList.push(classes[props.state])
  }

  return (
    <li
      className={classList.join(' ')}
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      {props.answer.text}
    </li>
  );
}

export default AnswerItem
