import {
  CONSOLE_DELETE_REQUEST, CONSOLE_DELETE_REQUEST_COMPLETE,
  CONSOLE_FETCH_HISTORY, CONSOLE_REQUEST_CLICK,
  CONSOLE_UPDATE_HISTORY, CONSOLE_UPDATE_INPUT_DATA,
  CONSOLE_UPDATE_IS_LOADING,
  CONSOLE_UPDATE_OUTPUT_DATA
} from "../actions/actionTypes";

const initialState = {
  history: [], // id, title, status, body, showActions
  isLoading: false,
  deletingRequestId: null,
  confirmDeleteShow: false,
  inputData: {
    json: '',
    isValidJson: false,
    isTouched: false
  },
  outputData: {
    json: '',
    isValidJson: true
  }
}

export default function console_reducer(state = initialState, action) {
  switch (action.type) {
    case CONSOLE_FETCH_HISTORY:
      return {
        ...state,
        history: [...action.payload]
      }
    case CONSOLE_UPDATE_HISTORY:
      return {
        ...state,
        history: [...action.payload]
      }
    case CONSOLE_UPDATE_OUTPUT_DATA:
      return {
        ...state,
        outputData: {...action.payload}
      }
    case CONSOLE_UPDATE_INPUT_DATA:
      return {
        ...state,
        inputData: {...action.payload},
      }
    case CONSOLE_UPDATE_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case CONSOLE_REQUEST_CLICK:
      return {
        ...state,
        inputData: {
          json: state.history.filter(el => el.id === action.payload)[0].body,
          isTouched: true,
          isValidJson: true
        }
      }
    case CONSOLE_DELETE_REQUEST:
      return {
        ...state,
        deletingRequestId: action.payload,
        confirmDeleteShow: true
      }
    case CONSOLE_DELETE_REQUEST_COMPLETE:
      return {
        ...state,
        deletingRequestId: null,
        confirmDeleteShow: false
      }
    default:
      return state
  }
}
