import AxiosRepository from 'common/axios.repository'
import dayjs from 'dayjs'
// import { formateDate } from 'util'

const formatDate = date => dayjs(date).format('YYYY-MM-DD')

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

  async readMeasurementsByDate(from, to) {
    return await super.get(
      `/by-date?from=${formatDate(from)}&to=${formatDate(to)}`
    )
  }

  async updateMeasurement(measurement) {
    return await super.put(`/${measurement._id}`, measurement)
  }

  async deleteMeasurement(measurement) {
    return await super.delete(`/${measurement._id}`)
  }
}
