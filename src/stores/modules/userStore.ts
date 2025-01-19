import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/user'
import { useLocalStorage } from '@vueuse/core'
import { getUserInfoApi } from '@/api'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<UserInfo | null>(null)
    const getUserInfo = async (params: any) => {
      const res = await getUserInfoApi(params)
      if (res.data) {
        userInfo.value = res.data
        useLocalStorage('userInfo', res.data)
        return res.data
      }
    }
    return { userInfo, getUserInfo }
  },
  {
    persist: true,
  },
)
