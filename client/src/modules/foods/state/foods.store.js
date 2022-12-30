import foodsActions from './foods.actions'
import foodsThunks from './foods.thunks'
import foodsListeners from './foods.listeners'
import foodsComputeds from './foods.computeds'
import foodsInitialState from './foods.initialState'

const foodsStore = {
  ...foodsInitialState,
  ...foodsActions,
  ...foodsThunks,
  ...foodsListeners,
  ...foodsComputeds,
}

export default foodsStore
