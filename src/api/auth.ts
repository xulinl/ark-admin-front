import http from '@/utils/http/index'

const enum authApi {
  login = 'auth/login',
  register = 'auth/register',
  refresh = 'auth/refresh',
  logout = 'auth/logout',
}
// 注册
export const registerApi = (data: any) => http.post(authApi.register, data)
// 登录
export const loginApi = (data: any) => http.post(authApi.login, data)

// 刷新token
export const refreshTokenApi = (data: any) => http.post(authApi.refresh, data)

// 退出登录
export const logoutApi = () => http.get('auth/logout')
