import { action } from 'easy-peasy'

const authActions = {
  setIsAuthenticated: action((state, isAuthenticated) => {
    state.isAuthenticated = true
  }),
}

export default authActions
