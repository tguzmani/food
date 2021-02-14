import { ERROR, LOADING, READ_USER, SIGN_IN, CLEAR_MESSAGE } from './authTypes'
import axios from 'axios'

const handleError = (dispatch, error) => {
  dispatch({ type: ERROR, payload: error.response.data })
  setTimeout(() => {
    dispatch({ type: CLEAR_MESSAGE, payload: error.response.data.message })
  }, 3000)
}

const config = { headers: { 'Content-Type': 'application/json' } }

export const setLoading = () => dispatch => {
  return dispatch({ type: LOADING })
}

export const signin = credentials => async dispatch => {
  setLoading()(dispatch)

  try {
    const res = await axios.post('/api/auth/signin', credentials, config)
    dispatch({ type: SIGN_IN, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
    // dispatch({ type: ERROR_AUTH, payload: error.response.data.message })
  }
}

export const readUser = () => async dispatch => {
  setLoading()(dispatch)

  try {
    const res = await axios.get(`/api/user/`)
    dispatch({ type: READ_USER, payload: res.data })
  } catch (error) {
    dispatch({ type: ERROR, payload: error.response.data.message })
  }
}
