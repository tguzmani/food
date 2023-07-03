import { Actions, thunk } from 'easy-peasy'
import UsersAuthRepository from './users.auth.repository'
import UsersStoreModel from '../users.store.model'
import { UserCredentials } from '../../models/users.auth.model'
import { User } from '../../models/users.model'

const usersAuthRepository = new UsersAuthRepository()

const usersAuthThunks = {
  signIn: thunk(async (actions: Actions<UsersStoreModel>, credentials: UserCredentials, { fail }) => {
    actions.setLoading(true)
    try {
      const user = await usersAuthRepository.signIn(credentials)

      actions.setUser(user)
      actions.setIsAuthenticated(true)
      actions.setLoading(false)
    } catch (error) {
      actions.setLoading(false)
      actions.setError(`${error}`)
    }
  }),

  signUp: thunk(async (actions: Actions<UsersStoreModel>, credentials: any, { fail }) => {
    actions.setLoading(true)
    try {
      const user = await usersAuthRepository.signUp(credentials)

      actions.setUser(user)
      actions.setIsAuthenticated(true)
      actions.setLoading(false)
    } catch (error) {
      actions.setLoading(false)
      actions.setError(`${error}`)
    }
  }),

  signOut: thunk(async (actions: Actions<UsersStoreModel>) => {
    actions.setLoading(true)
    await usersAuthRepository.signOut()

    actions.unsetUser()
    actions.setIsAuthenticated(false)
    actions.setLoading(false)
  }),
}

export const usersAuthThunksNames = Object.keys(usersAuthThunks).map(key => key)

export default usersAuthThunks
