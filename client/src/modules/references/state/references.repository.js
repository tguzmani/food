import AxiosRepository from 'common/axios.repository'

export default class MeasurementsRepository extends AxiosRepository {
  constructor() {
    super('measurements')
  }

  async createMeasurement(measurement) {
    return await super.post('/', measurement)
  }

  async readMeasurements() {
    return await super.get('/')
  }

  async updateMeasurement(measurement) {
    return await super.put(`/${measurement._id}`, measurement)
  }

  async deleteMeasurement(measurement) {
    return await super.delete(`/${measurement._id}`)
  }
}
