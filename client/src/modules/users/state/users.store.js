import usersActions from './users.actions'
import usersThunks from './users.thunks'
import usersAuthThunks from './auth/users.auth.thunks'
import usersAuthActions from './auth/users.auth.actions'
import usersListeners from './users.listeners'
import usersComputeds from './users.computeds'

const profileInitialState = {
  age: 0,
  height: 0,
  sex: '',
  baseWeight: 0,
  offset: 0,

  activity: 0,
  proteinPref: 0.8,
  fatPref: 20,
}

const usersStore = {
  user: undefined,
  profile: profileInitialState,
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
