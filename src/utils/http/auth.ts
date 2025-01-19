import { useLocalStorage } from '@vueuse/core'
import { refreshTokenApi } from '@/api/auth'
export const refreshToken = async (): Promise<string> => {
  try {
    const refreshToken = useLocalStorage('refreshToken', null).value
    const res = await refreshTokenApi({ refreshToken })
    const { token, refreshToken: newRefreshToken } = res.data
    useLocalStorage('token', token)
    useLocalStorage('refreshToken', newRefreshToken)
    return token
  } catch (error) {
    console.error('刷新 Token 失败:', error)
    throw error
  }
}

export const getToken = (): string | null => {
  return useLocalStorage('token', null).value
}
