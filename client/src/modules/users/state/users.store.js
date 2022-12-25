import usersActions from './users.actions'
import usersThunks from './users.thunks'
import usersAuthThunks from './auth/users.auth.thunks'
import usersAuthActions from './auth/users.auth.actions'
import usersListeners from './users.listeners'
import usersComputeds from './users.computeds'

const usersStore = {
  user: undefined,
  isAuthenticated: false,
  loading: true,
  error: undefined,

  ...usersActions,
  ...usersThunks,
  ...usersAuthActions,
  ...usersAuthThunks,
  ...usersListeners,
  ...usersComputeds,
}

export default usersStore
