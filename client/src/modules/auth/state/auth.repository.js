import AxiosRepository from 'common/axios.repository'

export default class AuthRepository extends AxiosRepository {
  constructor() {
    super('auth')
  }

  async signIn(user) {
    return await super.post('/sign-in', user)
  }

  async signOut() {
    return await super.post('/sign-out')
  }

  async signUp(user) {
    return await super.post('/sign-up', user)
  }

  async readUserById() {
    return await super.get('/profile')
  }
}
