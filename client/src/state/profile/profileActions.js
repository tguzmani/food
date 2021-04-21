import { SET_FIELDS, SET_SLIDERS, SET_STATE } from './profileTypes'

export const setFields = (name, value) => dispatch => {
  return dispatch({ type: SET_FIELDS, payload: { name, value } })
}

export const setSliders = (e, value) => dispatch => {
  return dispatch({ type: SET_SLIDERS, payload: value })
}

export const setState = payload => dispatch => {
  return dispatch({ type: SET_STATE, payload })
}
