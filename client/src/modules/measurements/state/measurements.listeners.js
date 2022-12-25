import { startLoading, stopLoading, setError } from 'common/listeners'
import { measurementsThunksNames } from './measurements.thunks'

const measurementsListeners = {
  ...startLoading(...measurementsThunksNames),
  ...stopLoading(...measurementsThunksNames),
  ...setError(...measurementsThunksNames),
}

export default measurementsListeners
