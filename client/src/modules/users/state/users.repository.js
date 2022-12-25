import AxiosRepository from 'common/axios.repository'

export default class UsersRepository extends AxiosRepository {
  constructor() {
    super('users')
  }

  async createUser(user) {
    return await super.post('/', user)
  }

  async readUsers() {
    return await super.get('/')
  }

  async updateUser(user) {
    return await super.put(`/${user._id}`, user)
  }

  async deleteUser(user) {
    return await super.delete(`/${user._id}`)
  }

  async deleteAllUsersFromDay(user) {
    return await super.delete(`/all`)
  }
}
