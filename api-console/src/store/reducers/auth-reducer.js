import {
  AUTH_EXPIRED,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT, AUTH_NOT_EXPIRED,
  AUTH_SUBMIT_LOADING
} from "../actions/actionTypes";

const initialState = {
  login: '',
  sublogin: '',
  password: '',
  isAuthExpired: true,
  error: null,
  submitLoading: false,
  githubLink: 'https://github.com/Dilmurod777',
}

export default function auth_reducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_EXPIRED:
      return {
        ...state,
        isAuthExpired: true
      }
    case AUTH_NOT_EXPIRED:
      return {
        ...state,
        isAuthExpired: false,
        login: action.payload
      }
    case AUTH_SUBMIT_LOADING:
      return {
        ...state,
        submitLoading: action.payload
      }
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        login: action.payload.login,
        sublogin: action.payload.sublogin,
        password: action.payload.password,
        isAuthExpired: action.payload.isAuthExpired
      }
    case AUTH_LOGIN_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        login: '',
        sublogin: '',
        password: '',
        error: null,
      }
    default:
      return state
  }
}
