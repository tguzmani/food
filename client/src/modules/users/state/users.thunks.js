import { thunk } from 'easy-peasy'
import UsersRepository from './users.repository'

const usersRepository = new UsersRepository()

const userThunks = {
  readUser: thunk(async (actions, _, { fail }) => {
    try {
      const user = await usersRepository.readUser()
      actions.setUser(user)
      actions.setIsAuthenticated(true)
    } catch (error) {
      fail(error)
    }
  }),

  updateUser: thunk(async (actions, user, { fail }) => {
    try {
      const updatedUser = await usersRepository.updateUser(user)
      actions.setUser(updatedUser)
    } catch (error) {
      fail(error)
    }
  }),
}

export const usersThunksNames = Object.keys(userThunks).map(key => key)

export default userThunks
