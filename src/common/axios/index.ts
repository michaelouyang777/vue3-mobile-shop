import axios from 'axios'
import httpConfig from './setting'

class Axios {
  private instance: any

  constructor() {
    this.init()
    this.setInterceptorsRequest()
    this.setInterceptorsResponse()
  }

  init() {
    this.instance = axios.create({
      baseURL: httpConfig.baseURL,
      timeout: httpConfig.timeout
    })
  }

  setInterceptorsRequest() {
    this.instance.interceptors.request.use((config: any) => {
      // dosomething
      return config
    }, (error: Error) => {
      return Promise.reject(error)
    })
  }

  setInterceptorsResponse() {
    this.instance.interceptors.response.use((response: any) => {
      // dosomething
      return response
    }, (error: Error) => {
      return Promise.reject(error)
    })
  }

}

export default new Axios()