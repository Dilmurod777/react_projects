import Sendsay from "sendsay-api";
import {
  CONSOLE_FETCH_HISTORY,
  CONSOLE_UPDATE_HISTORY,
  CONSOLE_UPDATE_OUTPUT_DATA,
  CONSOLE_UPDATE_INPUT_DATA,
  CONSOLE_UPDATE_IS_LOADING,
} from "./actionTypes";

export function fetchHistory() {
  let history = JSON.parse(localStorage.getItem('history') || '[]')
  history = history.map(el => {
    el.showActions = false
    el.copyCompleted = false
    return el
  })


  return {
    type: CONSOLE_FETCH_HISTORY,
    payload: [...history]
  }
}

export function updateHistory(history) {
  localStorage.setItem('history', JSON.stringify(history))
  return {
    type: CONSOLE_UPDATE_HISTORY,
    payload: history
  }
}

export function updateOutputData(outputData) {
  return {
    type: CONSOLE_UPDATE_OUTPUT_DATA,
    payload: outputData
  }
}

export function updateInputData(value) {
  return async (dispatch) => {
    const inputData = {}
    inputData.json = value
    inputData.isValidJson = isValidJsonFormat(value)
    inputData.isTouched = true

    return dispatch({
      type: CONSOLE_UPDATE_INPUT_DATA,
      payload: inputData
    })
  }
}

export function updateIsLoading(value) {
  return {
    type: CONSOLE_UPDATE_IS_LOADING,
    payload: value
  }
}

export function sendRequest() {
  return async (dispatch, getState) => {
    if (getState().console.inputData.json.trim() !== '') {
      dispatch(updateIsLoading(true))

      const request = JSON.parse(getState().console.inputData.json)
      const sendsay = new Sendsay({
        auth: {
          login: getState().console.login,
          sublogin: getState().console.sublogin,
          password: getState().console.password,
        }
      });

      sendsay.request(request)
        .then(response => {
          dispatch(receiveResponse('success', request, response))
        })
        .catch((e) => {
          dispatch(receiveResponse('error', request, e))
        })
    }
  }
}

export function receiveResponse(type, request, response) {
  return async (dispatch, getState) => {
    const outputData = {...getState().console.outputData}
    const history = [...getState().console.history]
    if (type === 'error') delete response.request // remove request field from response

    const spaces = type === 'success' ? 4 : 0
    outputData.json = getPrettyJson(response, spaces)
    outputData.isValidJson = type === 'success'

    const foundIndex = isInHistory(getState().console.history, request)
    if (foundIndex !== -1) {
      // Old request found
      const foundRequest = history.splice(foundIndex, 1)[0]
      foundRequest.status = type
      history.unshift(foundRequest)
    } else {
      // No old request found
      history.unshift({
        id: history.length + 1,
        title: request.action,
        showActions: false,
        copyCompleted: false,
        status: type,
        body: JSON.stringify(request)
      })
    }

    dispatch(updateHistory(history))
    dispatch(updateOutputData(outputData))
    dispatch(updateIsLoading(false))
  }
}

export function formatInputData() {
  return async (dispatch, getState) => {
    const inputData = getState().console.inputData
    if (inputData.isValidJson) {
      const parsedData = JSON.parse(inputData.json)
      dispatch(updateInputData(getPrettyJson(parsedData)))
    }
  }
}

export function isInHistory(history, request) {
  let foundIndex = -1;

  Object.keys(history).forEach(index => {
    if (history[index].body === JSON.stringify(request)) {
      foundIndex = index
    }
  })

  return foundIndex
}

export function isValidJsonFormat(json) {
  try {
    JSON.parse(json)
  } catch (e) {
    return false
  }
  return true
}

export function getPrettyJson(json, spaces = 0) {
  const newLineChar = String.fromCharCode(13, 10)
  const keysLength = Object.keys(json).length
  const tabs = Array(spaces).fill(' ').join('')
  let comma = ','

  let stringifyData = `{${newLineChar}`
  Object.keys(json).forEach((key, index) => {
    if (index === keysLength - 1) {
      comma = ''
    }
    stringifyData += `${tabs}"${key}": "${json[key]}"${comma}${newLineChar}`
  })
  stringifyData += "}"

  return stringifyData
}
