import { getUserInfoApi } from './../../api/user'
import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import type { UserInfo } from '@/types/user'
import { registerApi, loginApi } from '@/api'
import { useLocalStorage } from '@vueuse/core'
import { useUserStore } from './userStore'
import { message } from 'ant-design-vue'
export const useAuthStore = defineStore(
  'auth',
  () => {
    const router = useRouter()
    const userStore = useUserStore()
    // 注册
    const register = async (params: any) => {
      const res = await registerApi(params)
      if (res.data) {
        message.success('注册成功')
        // 跳转至登录页
        router.push('/login')
      }
    }
    // 登录
    const login = async (params: any) => {
      const res = await loginApi(params)
      // 存储token
      if (res.data.accessToken) {
        useLocalStorage('token', res.data.accessToken)
      }
      // 存储refreshToken
      if (res.data.refreshToken) {
        useLocalStorage('refreshToken', res.data.refreshToken)
      }
      message.success('登录成功')
      // 存储用户信息
      await userStore.getUserInfo(params)
      // 跳转至首页
      router.push('/')
    }
    return { register, login }
  },
  {
    persist: true,
  },
)
