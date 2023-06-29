import AxiosRepository from 'common/axios.repository'

export default class ReferencesRepository extends AxiosRepository {
  constructor() {
    super('references')
  }

  async createReference(reference) {
    return await super.post('/', reference)
  }

  async readReferences() {
    return await super.get('')
  }

  async updateReference(reference) {
    return await super.put(`/${reference._id}`, reference)
  }

  async deleteReference(reference) {
    return await super.delete(`/${reference._id}`)
  }
}
