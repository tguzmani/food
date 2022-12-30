import { startLoading, stopLoading, setError } from 'common/listeners'
import { usersThunksNames } from './users.thunks'
import { usersAuthThunksNames } from './auth/users.auth.thunks'
import { thunkOn } from 'easy-peasy'

const usersListeners = {
  ...startLoading(...usersThunksNames, ...usersAuthThunksNames),
  ...stopLoading(...usersThunksNames, ...usersAuthThunksNames),
  ...setError(...usersThunksNames, ...usersAuthThunksNames),

  resetStores: thunkOn(
    actions => actions.signOut,
    (actions, _, { getStoreActions }) => {
      const stores = Object.keys(getStoreActions()).map(key => key)

      stores.forEach(store => {
        getStoreActions()[store].resetStore()
      })

      actions.setLoading(false)
    }
  ),
}

export default usersListeners
