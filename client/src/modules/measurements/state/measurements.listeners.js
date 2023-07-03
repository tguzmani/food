import { startLoading, stopLoading, onError } from 'common/listeners'
import { measurementsThunksNames } from './measurements.thunks'

const measurementsListeners = {
  ...startLoading(...measurementsThunksNames),
  ...stopLoading(...measurementsThunksNames),
  ...onError(...measurementsThunksNames),
}

export default measurementsListeners
