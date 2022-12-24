import { action } from 'easy-peasy'

const referenceActions = {
  appendReference: action((state, reference) => {
    state.references.push(reference)
  }),

  setReferences: action((state, references) => {
    state.references = references
  }),

  filterReferences: action((state, reference) => {
    state.references = state.references.filter(
      stateReference => stateReference._id !== reference._id
    )
  }),

  replaceReference: action((state, reference) => {
    state.references = state.references.map(stateReference =>
      stateReference._id === reference._id ? reference : stateReference
    )
  }),

  setLoading: action((state, loading) => {
    state.loading = loading
  }),
}

export default referenceActions
