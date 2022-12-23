import { createStore } from 'easy-peasy'

import auth from 'modules/auth/state/auth.store'
import foods from 'modules/foods/state/foods.store'

const store = createStore({
  auth,
  foods
})

export default store
