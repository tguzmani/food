import {
  ERROR,
  LOADING,
  CLEAR_MESSAGE,
  CREATE,
  READ_ALL,
  READ_BY_QUERY,
  UPDATE,
  DELETE,
} from './measureTypes'

import axios from 'axios'

import { config } from '../../util/state'
import dayjs from 'dayjs'

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
    const res = await axios.post(`/api/measurements`, measure, config)
    dispatch({ type: CREATE, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const readMeasures = () => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.get('/api/measurements')
    dispatch({ type: READ_ALL, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const readMeasuresByQuery = query => async dispatch => {
  setLoading()(dispatch)

  const { from, to } = query

  const initialDate = dayjs(from).format('YYYY-MM-DD')
  const finalDate = dayjs(to).format('YYYY-MM-DD')

  try {
    const res = await axios.get(`/api/measurements/by-date?from=${initialDate}&to=${finalDate}`)
    dispatch({ type: READ_BY_QUERY, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const updateMeasure = measure => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.put(`/api/measurements/${measure._id}`, measure, config)
    dispatch({ type: UPDATE, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const deleteMeasure = measure => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.delete(`/api/measurements/${measure._id}`)
    dispatch({ type: DELETE, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}
