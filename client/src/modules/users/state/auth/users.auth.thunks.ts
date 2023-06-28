import { Actions, thunk } from 'easy-peasy'
import UsersAuthRepository from './users.auth.repository'
import UsersStoreModel from '../users.store.model'
import { UserCredentials } from '../models/users.auth.model'
import { User } from '../models/users.model'

const usersAuthRepository = new UsersAuthRepository()

const usersAuthThunks = {
  signIn: thunk(async (actions: Actions<UsersStoreModel>, credentials: UserCredentials, { fail }) => {
    try {
      const user = await usersAuthRepository.signIn(credentials)

      actions.setUser(user)
      actions.setIsAuthenticated(true)
    } catch (error) {
      fail(error)
    }
  }),

  signUp: thunk(async (actions: Actions<UsersStoreModel>, credentials: UserCredentials, { fail }) => {
    try {
      const user = await usersAuthRepository.signUp(credentials)

      actions.setUser(user)
      actions.setIsAuthenticated(true)
    } catch (error) {
      fail(error)
    }
  }),

  signOut: thunk(async (actions: Actions<UsersStoreModel>) => {
    await usersAuthRepository.signOut()

    actions.unsetUser()
    actions.setIsAuthenticated(false)
  }),
}

export const usersAuthThunksNames = Object.keys(usersAuthThunks).map(key => key)

export default usersAuthThunks
