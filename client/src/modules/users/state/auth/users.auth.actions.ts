import { action } from 'easy-peasy'
import { UsersState } from '../users.store.model'

const authActions = {
  setIsAuthenticated: action((state: UsersState, isAuthenticated: boolean) => {
    state.isAuthenticated = true
  }),
}

export default authActions
