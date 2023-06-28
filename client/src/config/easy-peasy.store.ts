import { createStore } from 'easy-peasy'

import users from 'modules/users/state/users.store'
import foods from 'modules/foods/state/foods.store'
import measurements from 'modules/measurements/state/measurements.store'
import references from 'modules/references/state/references.store'

import { createTypedHooks } from 'easy-peasy'
import StoreModel from './easy-peasy.store.model'

const { useStoreActions, useStoreState } = createTypedHooks<StoreModel>()

export { useStoreActions, useStoreState }

const store = createStore({
  users,
  foods,
  measurements,
  references,
})

export default store
