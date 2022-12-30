import measurementsActions from './measurements.actions'
import measurementsThunks from './measurements.thunks'
import measurementsListeners from './measurements.listeners'
import measurementsComputeds from './measurements.computeds'
import measurementsInitialState from './measurements.initialState'

const measurementsStore = {
  ...measurementsInitialState,
  ...measurementsActions,
  ...measurementsThunks,
  ...measurementsListeners,
  ...measurementsComputeds,
}

export default measurementsStore
