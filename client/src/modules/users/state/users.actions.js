import { action } from 'easy-peasy'

const usersActions = {
  setUser: action((state, user) => {
    state.user = user
  }),

  setLoading: action((state, loading) => {
    state.loading = loading
  }),

  setProfileFields: action((state, payload) => {
    state.profile[payload.name] = parseFloat(payload.value)
  }),

  setProfile: action((state, profile) => {
    state.profile = { ...state.profile, ...profile }
  }),
}

export default usersActions
