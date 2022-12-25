import AxiosRepository from 'common/axios.repository'

export default class UsersRepository extends AxiosRepository {
  constructor() {
    super('users')
  }
  async updateUser(user) {
    return await super.post(`/${user._id}`, user)
  }
}
