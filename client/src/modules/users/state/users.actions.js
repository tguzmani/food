import { action } from 'easy-peasy'

const userActions = {
  setUser: action((state, user) => {
    state.user = user
  }),

  setLoading: action((state, loading) => {
    state.loading = loading
  }),
}

export default userActions
