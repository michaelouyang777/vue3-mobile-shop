import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import httpConfig from './setting'
import { Notify } from 'vant';

class Axios {
  private instance: any

  constructor() {
    this.init()
  }

  init() {
    this.instance = axios.create({
      baseURL: httpConfig.baseURL,
      timeout: httpConfig.timeout
    })
    this.setInterceptorsRequest()
    this.setInterceptorsResponse()
  }

  setInterceptorsRequest() {
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      // dosomething
      return config
    }, (error: Error) => {
      this.err(error);
    })
  }

  setInterceptorsResponse() {
    this.instance.interceptors.response.use((response: AxiosResponse) => {
      // console.log(response);
      const config: AxiosRequestConfig = response.config || '';

      const code = Number(response.status);
      if (code === 200) {
        return response.data;
      } 
      else {
        let errCode = [402, 403];
        if (errCode.includes(response.data.code)) {
          Notify({
            message: response.data.msg || '暂不不支持全屏',
            type: 'warning'
          });
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      }
    }, (error: Error) => {
      this.err(error);
    })
  }

  request(config: any) {
    return this.instance.request(config)
  }

  err(error: any) {
    if (error.message.includes('timeout')) {
      // console.log('error---->',error.config)
      Notify({
        message: '请求超时，请刷新网页重试',
        type: 'danger'
      });
    }
    if (error.response) {
      const data = error.response.data;
      const token = '';
      if (error.response.status === 403) {
        Notify({
          message: 'Forbidden',
          type: 'danger'
        });
      }
      if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
        Notify({
          message: 'Unauthorized',
          type: 'danger'
        });
        if (token) {
          // store.dispatch('Logout').then(() => {
          // 	setTimeout(() => {
          // 		window.location.reload();
          // 	}, 1500);
          // });
        }
      }
    }
    return Promise.reject(error);
  };

}

export default new Axios()