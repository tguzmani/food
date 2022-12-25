import { startLoading, stopLoading, setError } from 'common/listeners'
import { usersThunksNames } from './users.thunks'

const userListeners = {
  ...startLoading(...usersThunksNames),
  ...stopLoading(...usersThunksNames),
  ...setError(...usersThunksNames),
}

export default userListeners
