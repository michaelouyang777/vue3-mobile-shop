import { $fetchGet } from '@/common/axios/request';

export const getPeople = () => {
  return new Promise((resolve, reject) => {
    $fetchGet('/platform-user-center/ztSysUserInfo/getUserInfo', {}).then((res: any) => {
      resolve(res)
    })
  })
}