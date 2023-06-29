import { Actions, thunk } from 'easy-peasy'
import UsersRepository from './users.repository'
import UsersStoreModel from './users.store.model'
import { User } from '../models/users.model'

const usersRepository = new UsersRepository()

const usersThunks = {
  readUser: thunk(async (actions: Actions<UsersStoreModel>, _, { fail }) => {
    try {
      const user = await usersRepository.readUser()
      actions.setUser(user)
      actions.setIsAuthenticated(true)
    } catch (error) {
      fail(error)
    }
  }),

  readUsers: thunk(async (actions: Actions<UsersStoreModel>, _, { fail }) => {
    try {
      const users = await usersRepository.readUsers()
      actions.setUsers(users)
    } catch (error) {
      fail(error)
    }
  }),

  updateUser: thunk(async (actions: Actions<UsersStoreModel>, user: User, { fail }) => {
    const isSetupComplete = user.isSetupComplete || true

    try {
      const updatedUser = await usersRepository.updateUser({
        ...user,
        isSetupComplete,
      })
      actions.setUser(updatedUser)
    } catch (error) {
      fail(error)
    }
  }),

  updateUserByAdmin: thunk(async (actions: Actions<UsersStoreModel>, user: User, { fail }) => {
    try {
      const updatedUser = await usersRepository.updateUserByAdmin(user)
      actions.replaceUser(updatedUser)
    } catch (error) {
      fail(error)
    }
  }),
}

export const usersThunksNames = Object.keys(usersThunks).map(key => key)

export default usersThunks
