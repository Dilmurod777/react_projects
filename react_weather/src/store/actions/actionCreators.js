import {NEXT_PLACE, PREV_PLACE, SET_DEGREE_TYPE, SET_DEGREE_VALUE, SET_PLACE, SET_WEATHER_LOADING} from "./actions";

export function SetPlace(place) {
  return {type: SET_PLACE, payload: place}
}

export function NextPlaceAction() {
  return {type: NEXT_PLACE, payload: null}
}

export function PrevPlaceAction() {
  return {type: PREV_PLACE, payload: null}
}

export function SetDegreeValue(value) {
  return {type: SET_DEGREE_VALUE, payload: value}
}

export function SetDegreeType(value) {
  return {type: SET_DEGREE_TYPE, payload: value}
}

export function SetWeatherLoading(value) {
  return {type: SET_WEATHER_LOADING, payload: value}
}
