import { Actions, thunk } from 'easy-peasy'
import UsersRepository from './users.repository'
import UsersStoreModel from './users.store.model'
import { User } from '../models/users.model'

const usersRepository = new UsersRepository()

const usersThunks = {
  readUser: thunk(async (actions: Actions<UsersStoreModel>, _, { fail }) => {
    actions.setLoading(true)
    try {
      const user = await usersRepository.readUser()
      actions.setUser(user)
      actions.setIsAuthenticated(true)
      actions.setLoading(false)
    } catch (error) {
      actions.setLoading(false)
      actions.setError(`${error}`)
    }
  }),

  readUsers: thunk(async (actions: Actions<UsersStoreModel>, _, { fail }) => {
    actions.setLoading(true)
    try {
      const users = await usersRepository.readUsers()
      actions.setUsers(users)
      actions.setLoading(false)
    } catch (error) {
      actions.setLoading(false)
      actions.setError(`${error}`)
    }
  }),

  updateUser: thunk(async (actions: Actions<UsersStoreModel>, user: User, { fail }) => {
    actions.setLoading(true)
    const isSetupComplete = user.isSetupComplete || true

    try {
      const updatedUser = await usersRepository.updateUser({
        ...user,
        isSetupComplete,
      })
      actions.setUser(updatedUser)
      actions.setLoading(false)
    } catch (error) {
      actions.setLoading(false)
      actions.setError(`${error}`)
    }
  }),

  updateUserByAdmin: thunk(async (actions: Actions<UsersStoreModel>, user: User, { fail }) => {
    actions.setLoading(true)
    try {
      const updatedUser = await usersRepository.updateUserByAdmin(user)
      actions.replaceUser(updatedUser)
      actions.setLoading(false)
    } catch (error) {
      actions.setLoading(false)
      actions.setError(`${error}`)
    }
  }),
}

export const usersThunksNames = Object.keys(usersThunks).map(key => key)

export default usersThunks
