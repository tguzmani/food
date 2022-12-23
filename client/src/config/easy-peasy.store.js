import { createStore } from 'easy-peasy'

import auth from 'modules/auth/state/auth.store'
import foods from 'modules/foods/state/foods.store'
import measurements from 'modules/measurements/state/measurements.store'

const store = createStore({
  auth,
  foods,
  measurements
})

export default store
