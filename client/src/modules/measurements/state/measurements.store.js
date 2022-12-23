import measurementsActions from './measurements.actions'
import measurementsThunks from './measurements.thunks'
import measurementsListeners from './measurements.listeners'
import measurementsComputeds from './measurements.computeds'

const measurementStore = {
  measurements: [],
  loading: true,
  error: undefined,

  ...measurementsActions,
  ...measurementsThunks,
  ...measurementsListeners,
  ...measurementsComputeds,
}

export default measurementStore
