import { thunk } from 'easy-peasy'
import UsersRepository from 'modules/users/state/users.repository'
import AuthRepository from './auth.repository'

const authRepository = new AuthRepository()
const usersRepository = new UsersRepository()

const authThunks = {
  readProfile: thunk(async (actions, _, { fail }) => {
    try {
      const user = await authRepository.readUserById()
      actions.setUser(user)
    } catch (error) {
      fail(error)
    }
  }),

  updateUser: thunk(async (actions, food, { fail }) => {
    try {
      const updatedFood = await usersRepository.updateUser(food)
      actions.replaceFood(updatedFood)
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
