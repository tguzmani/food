import {
  ERROR,
  LOADING,
  CLEAR_MESSAGE,
  CREATE,
  READ_ALL,
  UPDATE,
  SOFT_UPDATE,
  DELETE,
  CREATE_BY_RECIPE,
  DELETE_ALL,
} from './foodTypes'

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

export const createFood = food => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.post(`/api/foods`, food, config)
    dispatch({ type: CREATE, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const createFoodsByRecipe = data => async dispatch => {
  const { recipeName, meal } = data
  setLoading()(dispatch)
  try {
    const res = await axios.post(
      `/api/foods/byRecipe/${recipeName}`,
      { meal },
      config
    )
    dispatch({ type: CREATE_BY_RECIPE, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const readFoods = () => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.get('/api/foods')
    dispatch({ type: READ_ALL, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const updateFood = (food, loading = true) => async dispatch => {
  if (loading) setLoading()(dispatch)
  try {
    const res = await axios.put(`/api/foods/${food._id}`, food, config)
    dispatch({ type: UPDATE, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const softUpdateFood = food => dispatch => {
  dispatch({ type: SOFT_UPDATE, payload: food })
}

export const deleteFood = food => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.delete(`/api/foods/${food._id}`)
    dispatch({ type: DELETE, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const deleteAllFoods = food => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.delete(`/api/foods/all`)
    dispatch({ type: DELETE_ALL, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}
