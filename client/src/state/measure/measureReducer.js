import {
  ERROR,
  LOADING,
  CLEAR_MESSAGE,
  CREATE,
  READ_ALL,
  UPDATE,
  DELETE,
  READ_BY_QUERY,
} from './measureTypes'

const initialState = {
  loading: false,
  message: null,
  measures: [],
  measuresByQuery: [],
}

const measureReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
        loading: false,
        measures: [action.payload, ...state.measures],
      }

    case READ_ALL:
      return { ...state, loading: false, measures: action.payload }

    case UPDATE:
      return {
        ...state,
        loading: false,
        measures: state.measures.map(measure =>
          measure._id === action.payload._id ? action.payload : measure
        ),
      }

    case DELETE:
      return {
        ...state,
        loading: false,
        measures: state.measures.filter(
          measure => measure._id !== action.payload._id
        ),
      }

    case READ_BY_QUERY:
      return {
        ...state,
        loading: false,
        measuresByQuery: action.payload,
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

export default measureReducer
