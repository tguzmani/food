import { action } from 'easy-peasy'
import usersInitialState from './users.initialState'

const usersActions = {
  setUser: action((state, user) => {
    state.user = user
  }),

  setUsers: action((state, users) => {
    state.users = users
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

  replaceUser: action((state, user) => {
    state.users = state.users.map(stateUser =>
      stateUser._id === user._id ? user : stateUser
    )
  }),

  resetStore: action(state => usersInitialState)
}

export default usersActions
