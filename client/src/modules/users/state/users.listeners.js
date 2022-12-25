import { startLoading, stopLoading, setError } from 'common/listeners'
import { usersThunksNames } from './users.thunks'
import { usersAuthThunksNames } from './auth/users.auth.thunks'

const usersListeners = {
  ...startLoading(...usersThunksNames, ...usersAuthThunksNames),
  ...stopLoading(...usersThunksNames, ...usersAuthThunksNames),
  ...setError(...usersThunksNames, ...usersAuthThunksNames),
}

export default usersListeners
