import { createStore } from 'easy-peasy'

import auth from '../modules/auth/state/auth.store'

const store = createStore({
  auth,
})

export default store
