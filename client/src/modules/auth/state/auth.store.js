import { computed } from 'easy-peasy'
// import authActions from './auth.actions'
// import authThunks from './auth.thunks'
// import authListeners from './auth.listeners'

const authStore = {
  user: undefined,
  isAuthenticated: false,
  loading: true,
  error: undefined,

  // ...authActions,
  // ...authThunks,
  // ...authListeners,
}

export default authStore
