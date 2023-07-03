import { startLoading, stopLoading, onError } from 'common/listeners'
import { foodsThunksNames } from './foods.thunks'

const foodsListeners = {
  ...startLoading(...foodsThunksNames),
  ...stopLoading(...foodsThunksNames),
  ...onError(...foodsThunksNames),
}

export default foodsListeners
