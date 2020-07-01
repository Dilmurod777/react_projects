import React from "react";
import {Link} from "react-router-dom";
import classes from './FinishedQuiz.module.css';

import Button from "../UI/Button/Button";

const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++
    }
    return total
  }, 0)

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => (
          <li key={index}>
            <strong>{index + 1}.</strong>&nbsp;
            {quizItem.question}
            <span className={classes[props.results[quizItem.id]]}/>
          </li>
        ))}
      </ul>

      <p>Correct {successCount} of {props.quiz.length}</p>

      <div>
        <Button onClick={props.onRetakeQuiz} type='primary'>Retake Quiz</Button>
        <Link to='/'>
          <Button type='success'>Go to Quiz List</Button>
        </Link>
      </div>
    </div>
  )
}

export default FinishedQuiz
