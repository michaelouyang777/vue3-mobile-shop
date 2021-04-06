import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import httpConfig from './setting'
import { Notify } from 'vant';
import store from '@/extension/store'

class Axios {
  private instance: any

  constructor() {
    this.init()
  }

  init() {
    this.instance = axios.create(httpConfig)
    this.setInterceptorsRequest()
    this.setInterceptorsResponse()
  }

  setInterceptorsRequest() {
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      const token = store.getters.getToken;
      token && (config.headers.Authorization = token);
      console.log('%c 🥦 config: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', config);
      return config
    }, (error: Error) => {
      this.err(error);
    })
  }

  setInterceptorsResponse() {
    this.instance.interceptors.response.use((response: AxiosResponse) => {
      // console.log(response);
      const config: AxiosRequestConfig = response.config || '';
      const code: Number = Number(response.status);
      if (code === 200) {
        return Promise.resolve(response.data);
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
      console.log('error---->', error.config)
      Notify({
        message: '请求超时，请刷新网页重试',
        type: 'danger'
      });
    }
    const status = error.response.status;
    if (status) {
      const data = error.response.data;
      const token = '';
      switch (status) {
        case 401:
          if (!(data.result && data.result.isLogin)) {
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
          break;
        case 403:
          Notify({
            message: 'Forbidden',
            type: 'danger'
          });
          break;
        case 404:
          Notify({
            message: '网络请求不存在',
            type: 'danger'
          });
          break;
        default:
          Notify({
            message: error.response.data.message,
            type: 'danger'
          });

      }
    }
    return Promise.reject(error);
  };
}

export default new Axios()