import { action } from 'easy-peasy'
import usersInitialState from './users.initialState'

const usersActions = {
  setUser: action((state, user) => {
    state.user = user
  }),

  setLoading: action((state, loading) => {
    state.loading = loading
  }),

  setProfileFields: action((state, payload) => {
    state.profile[payload.name] =
      payload.value === '' ? '' : parseFloat(payload.value)
  }),

  setProfile: action((state, profile) => {
    state.profile = { ...state.profile, ...profile }
  }),

  resetStore: action(state => usersInitialState)
}

export default usersActions
