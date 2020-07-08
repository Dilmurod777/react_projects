import {combineReducers} from "redux";

import quizReducer from "./quiz";
import createReducer from "./quiz-create";
import authReducer from "./auth";

export default combineReducers({
  quiz: quizReducer,
  create: createReducer,
  auth: authReducer
})