import AxiosRepository from 'common/axios.repository'

export default class FoodsRepository extends AxiosRepository {
  constructor() {
    super('foods')
  }

  async createFood(food) {
    return await super.post('/', food)
  }

  async readFoods() {
    return await super.get('/')
  }

  async updateFood(food) {
    return await super.put(`/${food._id}`, food)
  }

  async deleteFood(food) {
    return await super.delete(`${food._id}`)
  }
}
