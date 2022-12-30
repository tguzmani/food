import referencesActions from './references.actions'
import referencesThunks from './references.thunks'
import referencesListeners from './references.listeners'
import referencesComputeds from './references.computeds'
import referencesInitialState from './references.initialState'

const referencesStore = {
  ...referencesInitialState,
  ...referencesActions,
  ...referencesThunks,
  ...referencesListeners,
  ...referencesComputeds,
}

export default referencesStore
