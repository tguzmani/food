import { action } from 'easy-peasy'
import referencesInitialState from './references.initialState'

const referencesActions = {
  appendReference: action((state, reference) => {
    state.references = [reference, ...state.references]
  }),

  setReferences: action((state, references) => {
    state.references = references
  }),

  filterReferences: action((state, reference) => {
    state.references = state.references.filter(
      stateReference => stateReference._id !== reference._id
    )
  }),

  setFilterReferencesQuery: action((state, query) => {
    state.filterReferencesQuery = query
  }),

  replaceReference: action((state, reference) => {
    state.references = state.references.map(stateReference =>
      stateReference._id === reference._id ? reference : stateReference
    )
  }),

  setLoading: action((state, loading) => {
    state.loading = loading
  }),

  resetStore: action(state => referencesInitialState)
}

export default referencesActions
