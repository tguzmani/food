import usersActions from './users.actions'
import usersAuthActions from './users.auth.actions'
import usersThunks from './users.thunks'
import usersAuthThunks from './users.auth.thunks'
import usersListeners from './users.listeners'
import usersComputeds from './users.computeds'

const usersStore = {
  user: undefined,
  isAuthenticated: false,
  loading: true,
  error: undefined,

  ...usersActions,
  ...usersAuthActions,
  ...usersThunks,
  ...usersAuthThunks,
  ...usersListeners,
  ...usersComputeds,
}

export default usersStore
