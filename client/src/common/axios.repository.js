import axios from 'axios'

export default class AxiosRepository {
  constructor(resource) {
    this.resource = resource

    this.instance = axios.create({
      baseURL: '/api',
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  endPoint(URL) {
    return `/${this.resource}${URL}`
  }

  async get(URL) {
    const response = await this.instance.get(this.endPoint(URL))
    return response.data
  }

  async post(URL, data) {
    const response = await this.instance.post(this.endPoint(URL), data)
    return response.data
  }

  async put(URL, data) {
    const response = await this.instance.put(this.endPoint(URL), data)
    return response.data
  }

  async delete(URL) {
    const response = await this.instance.delete(this.endPoint(URL))
    return response.data
  }
}
