import initialState from "../initialState";
import {
  NEXT_PLACE,
  PREV_PLACE,
  SET_DEGREE_TYPE,
  SET_DEGREE_VALUE,
  SET_PLACE,
  SET_WEATHER_LOADING
} from "../actions/actions";

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_WEATHER_LOADING:
      return {
        ...state,
        isWeatherLoading: action.payload
      }
    case SET_PLACE:
      const newPlaceIndex = state.places.indexOf(action.payload)
      return {
        ...state,
        placeIndex: newPlaceIndex === -1 ? state.placeIndex : newPlaceIndex,
        place: action.payload
      }
    case NEXT_PLACE:
      return {
        ...state,
        placeIndex: state.placeIndex + 1 === state.places.length
          ? 0
          : state.placeIndex + 1,
        place: state.placeIndex + 1 === state.places.length
          ? state.places[0]
          : state.places[state.placeIndex + 1]
      }
    case PREV_PLACE:
      return {
        ...state,
        placeIndex: state.placeIndex - 1 < 0
          ? state.places.length - 1
          : state.placeIndex - 1,
        place: state.placeIndex - 1 < 0
          ? state.places[state.places.length - 1]
          : state.places[state.placeIndex - 1]
      }
    case SET_DEGREE_VALUE:
      return {
        ...state,
        degreeValue: action.payload
      }
    case SET_DEGREE_TYPE:
      return {
        ...state,
        degreeType: action.payload
      }
    default:
      return state
  }
}

export default rootReducer
