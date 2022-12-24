import { startLoading, stopLoading, setError } from 'common/listeners'
import { referencesThunksNames } from './references.thunks'

const referenceListeners = {
  ...startLoading(...referencesThunksNames),
  ...stopLoading(...referencesThunksNames),
  ...setError(...referencesThunksNames),
}

export default referenceListeners
