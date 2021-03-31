import {
  ERROR,
  LOADING,
  CLEAR_MESSAGE,
  CREATE,
  READ,
  READ_ALL,
  UPDATE,
  DELETE,
} from './measureTypes'

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

export const createMeasure = measure => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.post(`/api/measure`, measure, config)
    dispatch({ type: CREATE, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const readMeasures = () => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.get('/api/measure/all')
    dispatch({ type: READ_ALL, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const updateMeasure = measure => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.put(`/api/measure/${measure._id}`, measure, config)
    dispatch({ type: UPDATE, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const deleteMeasure = measure => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.delete(`/api/measure/${measure._id}`)
    dispatch({ type: DELETE, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}
