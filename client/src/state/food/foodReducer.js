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

const initialState = {
  loading: false,
  message: null,
  foods: [],
  previewMealFoods: [],
}

let newFoods = []

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
        loading: false,
        foods: [action.payload, ...state.foods],
      }

    case CREATE_BY_RECIPE:
      return {
        ...state,
        loading: false,
        foods: [...action.payload, ...state.foods],
      }

    case READ_ALL:
      return {
        ...state,
        loading: false,
        foods: action.payload,
      }

    case UPDATE:
    case SOFT_UPDATE:
      newFoods = state.foods.map(food =>
        food._id === action.payload._id ? action.payload : food
      )
      return {
        ...state,
        loading: false,
        foods: newFoods,
      }

    case DELETE:
      newFoods = state.foods.filter(food => food._id !== action.payload._id)

      return {
        ...state,
        loading: false,
        foods: state.foods.filter(food => food._id !== action.payload._id),
      }

    case DELETE_ALL:
      return {
        ...state,
        foods: [],
      }

    case CLEAR_MESSAGE:
      return { ...state, message: null }

    case LOADING:
      return { ...state, loading: true }

    case ERROR:
      return { ...state, loading: false, message: action.payload }

    default:
      return state
  }
}

export default foodReducer
