import { startLoading, stopLoading, onError } from 'common/listeners'
import { referencesThunksNames } from './references.thunks'

const referencesListeners = {
  ...startLoading(...referencesThunksNames),
  ...stopLoading(...referencesThunksNames),
  ...onError(...referencesThunksNames),
}

export default referencesListeners
