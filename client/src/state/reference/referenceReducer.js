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

const initialState = {
  loading: false,
  message: null,
  references: [],
  filteredReferences: [],
  filtering: false,
}

const referenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
        loading: false,
        references: [action.payload, ...state.references],
      }

    case READ_ALL:
      return { ...state, loading: false, references: action.payload }

    case UPDATE:
      return {
        ...state,
        loading: false,
        references: state.references.map(reference =>
          reference._id === action.payload._id ? action.payload : reference
        ),
      }

    case DELETE:
      return {
        ...state,
        loading: false,
        references: state.references.filter(
          reference => reference._id !== action.payload._id
        ),
      }

    case FILTER:
      return {
        ...state,
        filteredReferences: state.references.filter(reference => {
          const regex = new RegExp(`${action.payload}`, 'gi')
          return reference.name.match(regex)
        }),
        filtering: true,
      }

    case CLEAR_FILTER:
      return {
        ...state,
        filteredReferences: null,
        filtering: false,
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

export default referenceReducer
