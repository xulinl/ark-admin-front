import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
export const setupStore = () => {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  return pinia
}
export { useAuthStore } from './modules/authStore'
export { useUserStore } from './modules/userStore'
