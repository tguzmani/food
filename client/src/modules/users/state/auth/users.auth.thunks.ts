import { Actions, thunk } from 'easy-peasy'
import UsersAuthRepository from './users.auth.repository'
import UsersStoreModel from '../users.store.model'
import { UserCredentials } from '../../models/users.auth.model'
import { User } from '../../models/users.model'

const usersAuthRepository = new UsersAuthRepository()

const usersAuthThunks = {
  signIn: thunk(async (actions: Actions<UsersStoreModel>, credentials: UserCredentials, { fail }) => {
    try {
      const response = await usersAuthRepository.signIn(credentials)

      localStorage.setItem('token', response.token)
      actions.setUser(response.user)
      actions.setIsAuthenticated(true)
    } catch (error) {
      fail(error)
    }
  }),

  signUp: thunk(async (actions: Actions<UsersStoreModel>, credentials: any, { fail }) => {
    try {
      const response = await usersAuthRepository.signUp(credentials)

      localStorage.setItem('token', response.token)
      actions.setUser(response.user)
      actions.setIsAuthenticated(true)
    } catch (error) {
      fail(error)
    }
  }),

  signOut: thunk(async (actions: Actions<UsersStoreModel>) => {
    await usersAuthRepository.signOut()

    localStorage.removeItem('token')
    actions.unsetUser()
    actions.setIsAuthenticated(false)
  }),
}

export const usersAuthThunksNames = Object.keys(usersAuthThunks).map(key => key)

export default usersAuthThunks
