import { ERROR, LOADING, READ_USER, SIGN_IN, CLEAR_MESSAGE } from './authTypes'
const initialState = {
  loading: true,
  message: null,
  isAuthenticated: false,
  user: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true }

    case SIGN_IN:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        message: action.payload,
      }

    case READ_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
        user: action.payload,
        isAuthenticated: true,
      }

    case CLEAR_MESSAGE:
      return { ...state, message: null }

    case ERROR:
      return { ...state, loading: false, message: action.payload }

    default:
      return state
  }
}

export default authReducer
