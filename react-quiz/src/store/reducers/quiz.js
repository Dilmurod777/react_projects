import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETAKE
} from "../actions/actionTypes";

const initialState = {
  quizes: [],
  error: null,
  loading: false,
  quiz: null,
  results: {},
  isFinished: false,
  activeQuestionIndex: 0,
  answerState: null,
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true
      }
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        quizes: action.quizes,
        loading: false,
      }
    case FETCH_QERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        quiz: action.quiz,
        loading: false,
      }
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results
      }
    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true
      }
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        answerState: null,
        activeQuestionIndex: action.number
      }
    case QUIZ_RETAKE:
      return {
        ...state,
        isFinished: false,
        results: {},
        activeQuestionIndex: 0,
        answerState: null,
      }
    default:
      return state
  }
}
