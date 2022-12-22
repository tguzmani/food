import { thunk } from 'easy-peasy'
import AuthRepository from './auth.repository'

const authRepository = new AuthRepository()

const authThunks = {
  readProfile: thunk(async (actions, _, { fail }) => {
    try {
      const user = await authRepository.readUserById()
      actions.setUser(user)
    } catch (error) {
      fail(error)
    }
  }),

  signIn: thunk(async (actions, credentials, { fail }) => {
    try {
      const user = await authRepository.signIn(credentials)
      actions.setUser(user)
    } catch (error) {
      fail(error)
    }
  }),

  signOut: thunk(async (actions, credentials) => {
    await authRepository.signOut()
    actions.unsetUser()
  }),
}

export default authThunks
