import axios from './index'
import { Toast, Dialog } from 'vant';

export function $fetchPost(url: String, data: Object) {
  return new Promise((resolve, reject) => {
    axios.request({
      url,
      data,
      method: 'post'
    }).then((res: any) => {
      if (res.data.code === 200) {
        resolve(res.data)
      } else {
        Dialog.alert({
          title: '提示',
          message: res.data.message,
        })
      }
    }).catch((err: any) => {
      reject(err.data)
    })
  })
}

export function $fetchGet(url:String, params: Object) {
  return new Promise((resolve, reject) => {
    axios.request({
      url,
      params,
      method: 'get'
    }).then((res: any) => {
      if (res.data.code === 200) {
        resolve(res.data)
      } else {
        Dialog.alert({
          title: '提示',
          message: res.data.message,
        })
      }
    }).catch((err: any) => {
      reject(err.data)
    })
  })
}

export function $fetchPut(url: String, data: Object) {
  return new Promise((resolve, reject) => {
    axios.request({
      url,
      data,
      method: 'put'
    }).then((res: any) => {
      if (res.data.code === 200) {
        resolve(res.data)
      } else {
        Dialog.alert({
          title: '提示',
          message: res.data.message,
        })
      }
    }).catch((err: any) => {
      reject(err.data)
    })
  })
}

export function $fetchDelete(url:String, params: Object) {
  return new Promise((resolve, reject) => {
    axios.request({
      url,
      params,
      method: 'delete'
    }).then((res: any) => {
      if (res.data.code === 200) {
        resolve(res.data)
      } else {
        Dialog.alert({
          title: '提示',
          message: res.data.message,
        })
      }
    }).catch((err: any) => {
      reject(err.data)
    })
  })
}