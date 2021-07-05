import {ADD_ARTISTS} from "./actions";

export const AddArtists = (data) => {
  return {
    type: ADD_ARTISTS, payload: data
  }
}
