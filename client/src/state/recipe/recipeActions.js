import {
  ERROR,
  LOADING,
  CLEAR_MESSAGE,
  CREATE,
  READ_ALL,
  UPDATE,
  DELETE,
} from './recipeTypes'

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

export const createRecipe = recipe => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.post(`/api/recipe/fromFoods`, recipe, config)
    dispatch({ type: CREATE, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const readRecipes = () => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.get('/api/recipe/all')
    dispatch({ type: READ_ALL, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const updateRecipe = recipe => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.put(`/api/recipe/${recipe._id}`, recipe, config)
    dispatch({ type: UPDATE, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}

export const deleteRecipe = recipe => async dispatch => {
  setLoading()(dispatch)
  try {
    const res = await axios.delete(`/api/recipe/${recipe._id}`)
    dispatch({ type: DELETE, payload: res.data })
  } catch (error) {
    handleError(dispatch, error)
  }
}
