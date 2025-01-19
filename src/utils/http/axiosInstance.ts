import axios from 'axios'
import { message } from 'ant-design-vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 引入 nprogress 的样式
import { cancelPendingRequest, addPendingRequest, removePendingRequest } from './request'
import { getToken, refreshToken } from './auth'

// 创建 axios 实例
const instance = axios.create({
  baseURL: import.meta.env.API_BASE_URL || '/api',
  timeout: 30 * 1000, // 超时时间
  withCredentials: true, // 允许携带cookie
  maxContentLength: 5 * 1024 * 1024, // 设置最大响应数据为5MB
  headers: {
    'Content-Type': 'application/json',
  },
})

// 配置 NProgress
NProgress.configure({ showSpinner: false }) // 隐藏加载动画

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    cancelPendingRequest(config) // 取消重复请求
    addPendingRequest(config) // 添加请求到队列
    NProgress.start() // 开始显示进度条
    // 添加token到请求头
    if (getToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  (error) => {
    NProgress.done() // 隐藏请求进度条
    message.error('请求出错，请稍后重试')
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    NProgress.done() // 隐藏请求进度条
    removePendingRequest(response.config) // 移除请求队列
    if (response.data.code === 200) {
      //message.success(response.data.message || '请求成功！')
      return response.data
    } else {
      message.error(response.data.message || '请求失败！')
      return Promise.reject(response)
    }
  },
  async (error) => {
    NProgress.done() // 隐藏请求进度条
    removePendingRequest(error.config)
    if (axios.isCancel(error)) {
      console.log('请求已取消', error.message)
      return Promise.reject(error)
    }
    const originalRequest = error.config
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const newToken = await refreshToken()
        if (newToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`
          return instance(originalRequest)
        } else {
          message.error('登录状态已过期，请重新登录')
          return Promise.reject(error)
        }
      } catch (error) {
        message.error('登录状态已过期，请重新登录')
        return Promise.reject(error)
      }
    }
    if (error.response) {
      console.log('error', error)
      if (error.message) {
        message.error(error.message)
      } else {
        switch (error.response.status) {
          case 403:
            message.error('权限不足，无法访问')
            break
          case 404:
            message.error('接口未找到')
            break
          case 500:
            message.error('服务器错误，请稍后重试')
            break
          default:
            message.error('请求失败，请稍后重试')
        }
      }
    } else if (error.request) {
      console.error('网络错误，请检查网络连接:', error.request)
      message.error('网络错误，请检查网络连接')
    } else {
      console.error('请求失败，请稍后重试:', error.message)
      message.error('请求失败，请稍后重试')
    }
    return Promise.reject(error)
  },
)
export default instance
