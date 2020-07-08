import Sendsay from "sendsay-api";
import {
  AUTH_EXPIRED,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_NOT_EXPIRED,
  AUTH_SUBMIT_LOADING
} from "./actionTypes";

export function login(login, sublogin, password) {
  return async dispatch => {
    dispatch(toggleSubmitLoading(true))

    const sendsay = new Sendsay();
    const credentials = {
      login,
      password,
    }

    if (sublogin.trim() !== '') {
      credentials['sublogin'] = sublogin
    }

    sendsay.login(credentials)
      .then(() => {
        localStorage.setItem('expireDate', new Date().getTime().toString())
        localStorage.setItem('login', login)
        localStorage.setItem('sublogin', sublogin)

        credentials['isAuthExpired'] = false
        dispatch(login_success(credentials))
        dispatch(toggleSubmitLoading(false))
      })
      .catch(e => {
        const error = {
          id: e.id,
          explain: e.explain
        }

        dispatch(login_failed(error))
        dispatch(toggleSubmitLoading(false))
      })
  }
}

export function login_success(credentials) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: credentials
  }
}

export function login_failed(error) {
  return {
    type: AUTH_LOGIN_ERROR,
    payload: error
  }
}

export function logout() {
  localStorage.removeItem('expireDate')
  localStorage.removeItem('login')
  localStorage.removeItem('sublogin')

  return {
    type: AUTH_LOGOUT
  }
}

export function isAuthExpired() {
  return async dispatch => {
    const expireDate = localStorage.getItem('expireDate')
    const login = localStorage.getItem('login') || ''

    if (new Date().getTime() < new Date().setTime(parseInt(expireDate)) + 1000 * 3600) {
      dispatch(isNotExpired(login))
    } else {
      dispatch(isExpired())
      dispatch(logout())
    }
  }
}

export function isExpired() {
  return {
    type: AUTH_EXPIRED
  }
}


export function isNotExpired(login) {
  return {
    type: AUTH_NOT_EXPIRED,
    payload: login
  }
}

export function toggleSubmitLoading(value) {
  return {
    type: AUTH_SUBMIT_LOADING,
    payload: value
  }
}
