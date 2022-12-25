import { startLoading, stopLoading, setError } from 'common/listeners'
import { usersThunksNames } from './users.thunks'
import { usersAuthThunksNames } from './auth/users.auth.thunks'

const userListeners = {
  ...startLoading(...usersThunksNames, ...usersAuthThunksNames),
  ...stopLoading(...usersThunksNames, ...usersAuthThunksNames),
  ...setError(...usersThunksNames, ...usersAuthThunksNames),
}

export default userListeners
