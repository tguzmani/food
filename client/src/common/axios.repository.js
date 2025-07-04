import axios from 'axios'

export default class AxiosRepository {
  constructor(resource) {
    this.resource = resource

    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
      headers: { 'Content-Type': 'application/json' },
    })

    this.instance.interceptors.request.use(config => {
      const token = localStorage.getItem('token')
      config.headers.Authorization = token ? `Bearer ${token}` : ''
      return config
    })

    this.instance.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401 && error.response?.data?.message === 'Invalid token') {
          localStorage.removeItem('token')
          window.location.href = '/login?error=token_expired'
        }
        return Promise.reject(error)
      }
    )
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
