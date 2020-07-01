import React, {Component} from "react";
import {connect} from "react-redux";
import classes from './Quiz.module.css'

import {fetchQuizById, quizAnswerClick, retakeQuiz} from "../../store/actions/quiz";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  };

  componentWillUnmount() {
    this.props.onRetakeQuiz();
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer the questions...</h1>

          {
            this.props.loading || !this.props.quiz
              ? <Loader/>
              :
              this.props.isFinished
                ? <FinishedQuiz
                  results={this.props.results}
                  quiz={this.props.quiz}
                  onRetakeQuiz={this.props.onRetakeQuiz}
                />
                : <ActiveQuiz
                  answers={this.props.quiz[this.props.activeQuestionIndex].answers}
                  question={this.props.quiz[this.props.activeQuestionIndex].question}
                  onAnswerClick={this.props.quizAnswerClick}
                  quizLength={this.props.quiz.length}
                  activeQuestionIndex={this.props.activeQuestionIndex + 1}
                  state={this.props.answerState}
                />
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.quiz.quiz,
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestionIndex: state.quiz.activeQuestionIndex,
    answerState: state.quiz.answerState,
    loading: state.quiz.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    onRetakeQuiz: () => dispatch(retakeQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
