import http from '@/utils/http/index'

const enum userApi {
  getUserInfo = 'user/getUserInfo',
}

// 用户信息
export const getUserInfoApi = (data: any) => http.post(userApi.getUserInfo, data)
