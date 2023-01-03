import AxiosRepository from 'common/axios.repository'

export default class UsersRepository extends AxiosRepository {
  constructor() {
    super('users')
  }

  async readUser() {
    return await super.get('/profile')
  }

  async readUsers() {
    return await super.get('/')
  }

  async updateUser(user) {
    return await super.put('/', user)
  }

  async updateUserByAdmin(user) {
    return await super.put(`/${user._id}`, user)
  }
}
