import initialState from "../initialState";
import {ADD_ARTISTS} from "../actions/actions";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTISTS:
      return {
        ...state,
        artists: action.payload,
      }
    default:
      return state
  }
}

export default rootReducer
