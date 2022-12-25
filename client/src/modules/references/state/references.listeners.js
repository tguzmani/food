import { startLoading, stopLoading, setError } from 'common/listeners'
import { referencesThunksNames } from './references.thunks'

const referencesListeners = {
  ...startLoading(...referencesThunksNames),
  ...stopLoading(...referencesThunksNames),
  ...setError(...referencesThunksNames),
}

export default referencesListeners
