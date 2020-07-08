import {combineReducers} from "redux";
import auth_reducer from "./auth-reducer";
import console_reducer from "./console-reducer";

export default combineReducers({
  auth: auth_reducer,
  console: console_reducer
})
