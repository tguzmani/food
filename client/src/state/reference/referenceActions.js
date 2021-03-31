import {
  ERROR,
  LOADING,
  CLEAR_MESSAGE,
  CREATE,
  READ,
  READ_ALL,
  UPDATE,
  DELETE,
  FILTER,
  CLEAR_FILTER,
} from './referenceTypes'

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

export const createReference = reference => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.post(`/api/reference`, reference, config)
    dispatch({ type: CREATE, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const readReferences = () => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.get('/api/reference/all')
    dispatch({ type: READ_ALL, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const updateReference = reference => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.put(
      `/api/reference/${reference._id}`,
      reference,
      config
    )
    dispatch({ type: UPDATE, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const deleteReference = reference => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.delete(`/api/reference/${reference._id}`)
    dispatch({ type: DELETE, payload: res.data })
    dispatch({ type: CLEAR_FILTER })
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const filterReferences = text => dispatch => {
  dispatch({ type: FILTER, payload: text })
}

export const clearFilterReferences = () => dispatch => {
  dispatch({ type: CLEAR_FILTER })
}
