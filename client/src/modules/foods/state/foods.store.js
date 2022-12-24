import foodsActions from './foods.actions'
import foodsThunks from './foods.thunks'
import foodsListeners from './foods.listeners'
import foodsComputeds from './foods.computeds'

const foodStore = {
  foods: [],
  loading: false,
  error: undefined,

  ...foodsActions,
  ...foodsThunks,
  ...foodsListeners,
  ...foodsComputeds,
}

export default foodStore
