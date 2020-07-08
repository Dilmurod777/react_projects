import {CONSOLE_DELETE_REQUEST, CONSOLE_DELETE_REQUEST_COMPLETE, CONSOLE_REQUEST_CLICK} from "./actionTypes";
import {sendRequest, updateHistory} from "./console";

export function requestClick(id) {
  return {
    type: CONSOLE_REQUEST_CLICK,
    payload: id
  }
}

export function doClick(id) {
  return async dispatch => {
    dispatch(requestClick(id))
    dispatch(sendRequest())
    dispatch(toggleActions(id))
  }
}

export function copyClick(id) {
  return async (dispatch, getState) => {
    const requestJsonData = getState().console.history.filter(el => el.id === id)[0].body
    const textArea = document.createElement("textarea");

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent';

    textArea.value = requestJsonData;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    document.execCommand('copy');
    document.body.removeChild(textArea);

    dispatch(toggleCopyCompleted(id, true))
    dispatch(toggleActions(id))

    const timeout = setTimeout(() => {
      dispatch(toggleCopyCompleted(id, false))
      clearTimeout(timeout)
    }, 1000 * 3)
  }
}

export function deleteClick(id) {
  return {
    type: CONSOLE_DELETE_REQUEST,
    payload: id
  }
}

export function deleteConfirm() {
  return async (dispatch, getState) => {
    const history = [...getState().console.history].filter(el => el.id !== getState().console.deletingRequestId)
    dispatch(updateHistory(history))

    // hide the popup
    dispatch(deleteComplete())
  }
}

export function deleteCancel() {
  return async (dispatch, getState) => {
    dispatch(toggleActions(getState().console.deletingRequestId))
    dispatch(deleteComplete())
  }
}

export function deleteComplete() {
  return {
    type: CONSOLE_DELETE_REQUEST_COMPLETE
  }
}

export function toggleActions(id) {
  return async (dispatch, getState) => {
    let history = [...getState().console.history]
    history = history.map(el => {
      if (el.id === id) {
        el.showActions = !el.showActions
      } else {
        el.showActions = false
      }

      return el
    })

    dispatch(updateHistory(history))
  }
}

export function toggleCopyCompleted(id, value) {
  return async (dispatch, getState) => {
    let history = [...getState().console.history]

    history = history.map(el => {
      if (el.id === id) el.copyCompleted = value
      return el
    })

    dispatch(updateHistory(history))
  }
}
