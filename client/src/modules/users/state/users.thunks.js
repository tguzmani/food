import { thunk } from 'easy-peasy'
import UsersRepository from './users.repository'

const usersRepository = new UsersRepository()

const userThunks = {
  createUser: thunk(async (actions, user, { fail }) => {
    try {
      const createdUser = await usersRepository.createUser(user)
      actions.appendUser(createdUser)
    } catch (error) {
      fail(error)
    }
  }),

  readUsers: thunk(async (actions, _, { fail }) => {
    try {
      const users = await usersRepository.readUsers()
      actions.setUsers(users)
    } catch (error) {
      fail(error)
    }
  }),

  updateUser: thunk(async (actions, user, { fail }) => {
    try {
      const updatedUser = await usersRepository.updateUser(user)
      actions.replaceUser(updatedUser)
    } catch (error) {
      fail(error)
    }
  }),

  deleteUser: thunk(async (actions, user, { fail }) => {
    try {
      const removedUser = await usersRepository.deleteUser(user)
      actions.filterUsers(removedUser)
    } catch (error) {
      fail(error)
    }
  }),

  deleteAllUsersFromDay: thunk(async (actions, user, { fail }) => {
    try {
      const removedUser = await usersRepository.deleteAllUsersFromDay(user)
      actions.clearUsers()
    } catch (error) {
      fail(error)
    }
  }),
}

export const usersThunksNames = Object.keys(userThunks).map(key => key)

export default userThunks

