import measurementsActions from './measurements.actions'
import measurementsThunks from './measurements.thunks'
import measurementsListeners from './measurements.listeners'
import measurementsComputeds from './measurements.computeds'

const measurementsStore = {
  measurements: [],
  measurementsByQuery: [],
  loading: false,
  error: undefined,

  ...measurementsActions,
  ...measurementsThunks,
  ...measurementsListeners,
  ...measurementsComputeds,
}

export default measurementsStore
