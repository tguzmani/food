import { thunk } from 'easy-peasy'
import cookies from 'js-cookies'
import UsersRepository from './users.repository'

const usersRepository = new UsersRepository()

const usersThunks = {
  readUser: thunk(async (actions, _, { fail }) => {
    if (!cookies.getItem('t')) return

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

export const usersThunksNames = Object.keys(usersThunks).map(key => key)

export default usersThunks
