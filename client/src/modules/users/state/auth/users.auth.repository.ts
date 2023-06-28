import AxiosRepository from 'common/axios.repository'
import { UserCredentials } from 'modules/users/models/users.auth.model'
import { User } from 'modules/users/models/users.model'

export default class UsersAuthRepository extends AxiosRepository {
  constructor() {
    super('auth')
  }

  async signIn(credentials: UserCredentials) {
    return await super.post('/sign-in', credentials)
  }

  async signOut() {
    return await super.post('/sign-out')
  }

  async signUp(user: User) {
    return await super.post('/sign-up', user)
  }

  async readUserById() {
    return await super.get('/profile')
  }
}
