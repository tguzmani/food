import usersActions from './users.actions'
import usersThunks from './users.thunks'
import usersListeners from './users.listeners'
import usersComputeds from './users.computeds'

const userStore = {
  users: [],
  loading: false,
  error: undefined,

  ...usersActions,
  ...usersThunks,
  ...usersListeners,
  ...usersComputeds,
}

export default userStore
