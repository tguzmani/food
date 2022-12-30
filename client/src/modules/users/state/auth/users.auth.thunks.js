import { thunk } from 'easy-peasy'
import UsersAuthRepository from './users.auth.repository'

const usersAuthRepository = new UsersAuthRepository()

const usersAuthThunks = {
  signIn: thunk(async (actions, credentials, { fail }) => {
    try {
      const user = await usersAuthRepository.signIn(credentials)

      actions.setUser(user)
      actions.setIsAuthenticated(true)
    } catch (error) {
      fail(error)
    }
  }),

  signUp: thunk(async (actions, credentials, { fail }) => {
    try {
      const user = await usersAuthRepository.signUp(credentials)

      actions.setUser(user)
      actions.setIsAuthenticated(true)
    } catch (error) {
      fail(error)
    }
  }),

  signOut: thunk(async (actions, credentials) => {
    await usersAuthRepository.signOut()

    actions.setUser(undefined)
    actions.setIsAuthenticated(false)
  }),
}

export const usersAuthThunksNames = Object.keys(usersAuthThunks).map(key => key)

export default usersAuthThunks
