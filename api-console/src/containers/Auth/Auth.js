import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import is_js from "is_js";
import classes from './Auth.module.css'

import Input from "../../components/Input/Input";
import Loader from "../../components/Loader/Loader";
import Alert from "../../components/Alert/Alert";
import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";
import GithubLink from "../../components/GithubLink/GithubLink";
import {login} from "../../store/actions/auth";

class Auth extends Component {
  state = {
    pageLoading: true,
    auth: {
      isFormValid: false,
      formControls: {
        login: {
          value: '',
          isValid: false,
          touched: false,
          validation: {
            required: true,
            email: true,
            alphanumeric: true
          }
        },
        sublogin: {
          value: '',
          isValid: true,
          touched: true
        },
        password: {
          value: '',
          isValid: false,
          touched: false,
          validation: {
            required: true,
            password: true,
            minLength: 6
          }
        }
      }
    }
  }

  onChangeAuthValue = (elName, value) => {
    const auth = this.state.auth
    const formControl = auth.formControls[elName]
    formControl.value = value.trim()
    formControl.touched = true
    formControl.isValid = this.isValidInput(formControl, formControl.validation)

    auth.isFormValid = this.isValidForm(elName, formControl)

    this.setState({
      auth,
    })
  }

  isValidInput(input, rules) {
    let isValid = true

    // if no validation rules specified
    if (!rules || Object.keys(rules).length < 1) {
      return true
    }

    // validate on required rule
    if (rules.required) {
      isValid = input.value.trim() !== '' && isValid
    }

    // validate on minLength rule
    if (rules.minLength) {
      isValid = input.value.trim().length >= rules.minLength && isValid
    }

    // validate on email rule
    if (rules.email || rules.alphanumeric) {
      const isValidEmail = is_js.email(input.value)
      const isValidAlphanumeric = /^[0-9A-Za-z_]+$/.test(input.value)
      isValid = (isValidEmail || isValidAlphanumeric) && isValid
    }

    // validate on password rule
    if (rules.password) {
      isValid = /^[\w\d\s]+[\w\d]+$/.test(input.value) && isValid
    }

    return isValid
  }

  isValidForm(elName, updatedEl) {
    const formControls = this.state.auth.formControls
    let isValid = true;

    formControls[elName] = updatedEl
    Object.keys(formControls).forEach((el) => {
      isValid = isValid && formControls[el].isValid
    })

    return isValid
  }

  componentDidMount() {
    this.setState({
      pageLoading: false
    })
  }

  onSubmit = (event) => {
    event.preventDefault()

    if(this.state.auth.isFormValid){
      this.props.authLogin(
        this.state.auth.formControls.login.value,
        this.state.auth.formControls.sublogin.value,
        this.state.auth.formControls.password.value,
      )

      this.setState({
        pageLoading: false,
      })
    }
  }

  render() {
    if (this.state.pageLoading) {
      return <Loader/>
    } else {
      // If successfully logged in
      if (this.props.login.trim() !== '' && !this.props.isAuthExpired) {
        return <Redirect to={'/console'}/>
      }

      return (
        <div className={classes.Auth}>
          <div className={classes.Auth__inner_div}>
            <Logo/>

            <div className={classes.Auth__inner_div__formSection}>
              <h1 className={classes.Auth__inner_div__formSection_h1}>API-консолька</h1>

              {!!this.props.error ? <Alert heading='Вход не вышел' error={this.props.error}/> : null}

              <form onSubmit={this.onSubmit}>
                <Input
                  type='text'
                  label='Логин'
                  id='login'
                  placeholder='iamyourlogin@domain.xyz'
                  touched={this.state.auth.formControls.login.touched}
                  isValid={this.state.auth.formControls.login.isValid}
                  value={this.state.auth.formControls.login.value}
                  onChange={this.onChangeAuthValue}
                />

                <Input
                  type='text'
                  label='Сублогин'
                  id='sublogin'
                  placeholder='sublogin-could-be-here'
                  optional={true}
                  touched={this.state.auth.formControls.sublogin.touched}
                  isValid={this.state.auth.formControls.sublogin.isValid}
                  value={this.state.auth.formControls.sublogin.value}
                  onChange={this.onChangeAuthValue}
                />

                <Input
                  type='password'
                  label='Пароль'
                  id='password'
                  placeholder='************'
                  touched={this.state.auth.formControls.password.touched}
                  isValid={this.state.auth.formControls.password.isValid}
                  value={this.state.auth.formControls.password.value}
                  onChange={this.onChangeAuthValue}
                />

                <Button
                  title='Войти'
                  isValid={this.state.auth.isFormValid}
                  loading={this.props.submitLoading}
                  onClick={this.onSubmit}
                  addMargin={true}
                />
              </form>
            </div>

            <GithubLink link={this.props.githubLink} margin={true}/>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    login: state.auth.login,
    error: state.auth.error,
    isAuthExpired: state.auth.isAuthExpired,
    submitLoading: state.auth.submitLoading,
    githubLink: state.auth.githubLink,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authLogin: (loginValue, subloginValue, passwordValue) => dispatch(login(loginValue, subloginValue, passwordValue))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
