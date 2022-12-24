import referencesActions from './references.actions'
import referencesThunks from './references.thunks'
import referencesListeners from './references.listeners'
import referencesComputeds from './references.computeds'

const referenceStore = {
  references: [],
  loading: true,
  error: undefined,

  ...referencesActions,
  ...referencesThunks,
  ...referencesListeners,
  ...referencesComputeds,
}

export default referenceStore
