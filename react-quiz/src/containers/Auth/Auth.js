import React, {Component} from 'react'
import {connect} from "react-redux";
import is from 'is_js'
import classes from './Auth.module.css'

import {auth} from "../../store/actions/auth";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";


class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Enter valid email.',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Enter valid password.',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        }
      },
    }
  }

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
  }

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )
  }

  submitHandler = (event) => {
    event.preventDefault()
  }

  validateFormControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.trim().length >= validation.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (event, formControlName) => {
    const formControls = {...this.state.formControls}
    const formControl = {...formControls[formControlName]}

    formControl.value = event.target.value
    formControl.touched = true
    formControl.valid = this.validateFormControl(formControl.value, formControl.validation)

    formControls[formControlName] = formControl

    let isFormValid = true
    Object.keys(this.state.formControls).forEach(controlName => {
      isFormValid = this.state.formControls[controlName].valid && isFormValid
    })

    this.setState({
      formControls,
      isFormValid
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((formControlName, index) => {
      const formControl = this.state.formControls[formControlName]
      return (
        <Input
          key={formControl + index}
          type={formControl.type}
          value={formControl.value}
          label={formControl.label}
          valid={formControl.valid}
          touched={formControl.touched}
          shouldValidate={!!formControl.validation}
          errorMessage={formControl.errorMessage}
          onChange={(event) => this.onChangeHandler(event, formControlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Authorization</h1>

          <form className={classes.AuthForm} onSubmit={this.submitHandler}>
            {this.renderInputs()}

            <Button
              type='success'
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Login
            </Button>

            <Button
              type='primary'
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth)
