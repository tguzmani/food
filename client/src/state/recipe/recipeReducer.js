import {
  ERROR,
  LOADING,
  CLEAR_MESSAGE,
  CREATE,
  READ_ALL,
  UPDATE,
  DELETE,
} from './recipeTypes'

const initialState = {
  loading: false,
  message: null,
  recipes: [],
}

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
        loading: false,
        recipes: [action.payload, ...state.recipes],
      }

    case READ_ALL:
      return { ...state, loading: false, recipes: action.payload }

    case UPDATE:
      return {
        ...state,
        loading: false,
        recipes: state.recipes.map(recipe =>
          recipe._id === action.payload._id ? action.payload : recipe
        ),
      }

    case DELETE:
      return {
        ...state,
        loading: false,
        recipes: state.recipes.filter(
          recipe => recipe._id !== action.payload._id
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

export default recipeReducer
