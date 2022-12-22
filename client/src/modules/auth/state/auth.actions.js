import { action } from 'easy-peasy'

const authActions = {
  setUser: action((state, user) => {
    state.user = user
    state.isAuthenticated = true
  }),

  unsetUser: action((state, user) => {
    state.user = undefined
    state.isAuthenticated = false
  }),

  setLoading: action((state, loading) => {
    state.loading = loading
  }),
}

export default authActions
