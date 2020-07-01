import React, {Component} from 'react';
import {connect} from "react-redux";
import classes from './QuizCreator.module.css'

import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";
import {createControl, validate, validateForm} from "../../form/FormFramework";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import Loader from "../../components/UI/Loader/Loader";

function createOptionControl(number) {
  return createControl({
    id: number,
    label: `Option ${number}`,
    errorMessage: 'Invalid option entered.'
  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Enter question',
      errorMessage: 'Invalid question entered.'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

class QuizCreator extends Component {
  state = {
    loading: false,
    isFormValid: false,
    correctAnswerId: 1,
    formControls: createFormControls(),
  }

  submitHandler = (event) => {
    event.preventDefault()
  }

  addQuestionHandler = (event) => {
    event.preventDefault()

    const {question, option1, option2, option3, option4} = this.state.formControls

    const questionItem = {
      id: this.props.quiz.length + 1,
      question: question.value,
      correctAnswerId: this.state.correctAnswerId,
      answers: [
        {id: option1.id, text: option1.value},
        {id: option2.id, text: option2.value},
        {id: option3.id, text: option3.value},
        {id: option4.id, text: option4.value},
      ]
    }

    this.props.createQuizQuestion(questionItem)

    this.setState({
      isFormValid: false,
      correctAnswerId: 1,
      formControls: createFormControls(),
    })
  }

  createQuizHandler = (event) => {
    event.preventDefault()

    this.setState({
      loading: true
    })

    this.props.finishCreateQuiz()

    this.setState({
      loading: false,
      isFormValid: false,
      correctAnswerId: 1,
      formControls: createFormControls(),
    })
  }

  inputChangeHandler = (event, formControlName) => {
    const formControls = {...this.state.formControls}
    const formControl = {...formControls[formControlName]}

    formControl.touched = true
    formControl.value = event.target.value
    formControl.valid = validate(formControl.value, formControl.validation)

    formControls[formControlName] = formControl

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((formControlName, index) => {
      const formControl = this.state.formControls[formControlName]
      return (
        <Auxiliary key={index}>
          <Input
            label={formControl.label}
            value={formControl.value}
            valid={formControl.valid}
            touched={formControl.touched}
            shouldValidate={!!formControl.validation}
            errorMessage={formControl.errorMessage}
            onChange={event => {
              this.inputChangeHandler(event, formControlName)
            }}
          />
          {
            index === 0 ? <hr/> : null
          }
        </Auxiliary>
      )
    })
  }

  selectChangeHandler = event => {
    this.setState({
      correctAnswerId: +event.target.value
    })
  }

  render() {
    const select = <Select
      label="Choose the correct answer"
      value={this.state.correctAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4},
      ]}
    />

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Create New Quiz</h1>

          {
            this.state.loading
              ? <Loader/>
              : <form onSubmit={this.submitHandler}>

                {this.renderInputs()}

                {select}

                <Button
                  type='primary'
                  onClick={this.addQuestionHandler}
                  disabled={!this.state.isFormValid}
                >
                  Add a question
                </Button>

                <Button
                  type='success'
                  onClick={this.createQuizHandler}
                  disabled={this.props.quiz.length === 0}
                >
                  Publish Quiz
                </Button>


              </form>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
