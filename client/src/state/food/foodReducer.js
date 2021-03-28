import {
  ERROR,
  LOADING,
  CLEAR_MESSAGE,
  CREATE,
  READ_ALL,
  UPDATE,
  SOFT_UPDATE,
  DELETE,
} from './foodTypes'

const initialState = {
  loading: false,
  message: null,
  foods: [],
  previewMealFoods: [],
  mealNumbers: [],
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

    case READ_ALL:
      return {
        ...state,
        loading: false,
        foods: action.payload,
        mealNumbers: [...new Set(action.payload.map(food => food.meal))].sort(
          (a, b) => b - a
        ),
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
        mealNumbers: [...new Set(newFoods.map(food => food.meal))].sort(
          (a, b) => b - a
        ),
      }

    case DELETE:
      newFoods = state.foods.filter(food => food._id !== action.payload._id)

      return {
        ...state,
        loading: false,
        foods: state.foods.filter(food => food._id !== action.payload._id),
        mealNumbers: [...new Set(newFoods.map(food => food.meal))].sort(
          (a, b) => b - a
        ),
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
