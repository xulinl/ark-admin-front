import { ref, watch, onMounted } from 'vue'
import useLocalStorage from '@/hooks/utils/useLocalStorage'
import { APP_DARK_MODE_KEY } from '@/enums/cacheEnums'
import { ThemeEnum } from '@/enums/appEnums'

// 创建一个自定义 Hook
export function useTheme() {
  // 默认主题色为 light
  const theme = ref(ThemeEnum.LIGHT)

  // 切换主题色的函数
  const toggleTheme = () => {
    theme.value = theme.value === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT
    document.documentElement.setAttribute('data-theme', theme.value.toLowerCase())
  }

  // 监听主题色变化并保存到 localStorage
  const themeStorage = useLocalStorage<ThemeEnum>(APP_DARK_MODE_KEY, ThemeEnum.LIGHT)
  watch(theme, (newTheme) => {
    themeStorage.value = newTheme
  })

  // 挂载时从 localStorage 中读取主题色
  onMounted(() => {
    const savedTheme = themeStorage.value
    if (savedTheme) {
      theme.value = savedTheme
      document.documentElement.setAttribute('data-theme', savedTheme.toLowerCase())
    } else {
      document.documentElement.setAttribute('data-theme', theme.value.toLowerCase())
    }
  })

  return {
    theme,
    toggleTheme,
  }
}
