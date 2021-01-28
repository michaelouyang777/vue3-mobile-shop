import axios from 'axios'
import httpConfig from './setting'

class Axios {
  instance: any

  constructor() {
    this.init()
  }

  init() {
    this.getInstance()
    this.setInterceptorsRequest()
    this.setInterceptorsResponse()
  }

  getInstance() {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: httpConfig.baseURL,
        timeout: httpConfig.timeout
      })
    }
    return this.instance
  }

  setInterceptorsRequest() {
    this.instance.interceptors.use((config: any) => {
      // dosomething
      return config
    }, (error: Error) => {
      return Promise.reject(error)
    })
  }

  setInterceptorsResponse() {
    this.instance.interceptors.use((response: any) => {
      // dosomething
      return response
    }, (error: Error) => {
      return Promise.reject(error)
    })
  }

}