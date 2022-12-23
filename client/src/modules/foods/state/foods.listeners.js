import { startLoading, stopLoading, setError } from 'common/listeners'
import { foodsThunksNames } from './foods.thunks'

const foodListeners = {
  ...startLoading(...foodsThunksNames),
  ...stopLoading(...foodsThunksNames),
  ...setError(...foodsThunksNames),
}

export default foodListeners
