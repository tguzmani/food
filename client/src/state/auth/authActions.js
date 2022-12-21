import {
  ERROR,
  LOADING,
  READ_USER,
  UPDATE_USER,
  SIGN_IN,
  CLEAR_MESSAGE,
  SIGN_OUT,
} from './authTypes'
import axios from 'axios'

import { config } from '../../util/state'

export const handleError = (dispatch, error) => {
  dispatch({ type: ERROR, payload: error.response.data })
  setTimeout(() => {
    dispatch({ type: CLEAR_MESSAGE, payload: error.response.data.message })
  }, 3000)
}

export const setLoading = () => dispatch => {
  return dispatch({ type: LOADING })
}

export const signin = credentials => async dispatch => {
  setLoading()(dispatch)

  try {
    const res = await axios.post('/api/auth/sign-in', credentials, config)
    dispatch({ type: SIGN_IN, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const readUser = () => async dispatch => {
  setLoading()(dispatch)

  try {
    const res = await axios.get(`/api/users/`)
    dispatch({ type: READ_USER, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR, payload: error.response.data.message })
  }
}

export const updateUser = user => async dispatch => {
  setLoading()(dispatch)

  try {
    const res = await axios.put(`/api/users/`, user, config)
    dispatch({ type: UPDATE_USER, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR, payload: error.response.data.message })
  }
}

export const signout = () => async dispatch => {
  setLoading()(dispatch)

  try {
    await axios.get(`/api/auth/sign-out`)
    dispatch({ type: SIGN_OUT })
  } catch (error) {
    dispatch({ type: ERROR, payload: error.response.data.message })
  }
}
