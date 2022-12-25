import { action } from 'easy-peasy'

const userActions = {
  appendUser: action((state, user) => {
    state.users.push(user)
  }),

  setUsers: action((state, users) => {
    state.users = users
  }),

  clearUsers: action(state => {
    state.users = []
  }),

  filterUsers: action((state, user) => {
    state.users = state.users.filter(stateUser => stateUser._id !== user._id)
  }),

  replaceUser: action((state, user) => {
    state.users = state.users.map(stateUser =>
      stateUser._id === user._id ? user : stateUser
    )
  }),

  setLoading: action((state, loading) => {
    state.loading = loading
  }),
}

export default userActions
