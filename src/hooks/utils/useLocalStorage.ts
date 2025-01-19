// src/hooks/utils/useLocalStorage.ts
import { ref, watch, onMounted, type Ref } from 'vue'

type StorageType = 'localStorage' | 'sessionStorage'

function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T), // 修改为可选函数形式
  storageType: StorageType = 'localStorage',
): Ref<T> {
  const storage = storageType === 'localStorage' ? localStorage : sessionStorage

  // 辅助函数：从存储中获取并解析值
  function getStoredValue(): T | null {
    try {
      const storedValue = storage.getItem(key)
      if (storedValue === null || storedValue === 'undefined') {
        return null
      }
      return JSON.parse(storedValue) as T
    } catch (error) {
      console.error('Failed to parse stored value:', error)
      return null
    }
  }

  // 使用 initialValue 作为默认值
  const parsedValue = getStoredValue()
  const resolvedInitialValue =
    typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue
  const value = ref<T>(parsedValue !== null ? parsedValue : resolvedInitialValue)

  // 立即同步一次存储中的值
  onMounted(() => {
    if (parsedValue !== null) {
      storage.setItem(key, JSON.stringify(parsedValue))
    } else {
      storage.setItem(key, JSON.stringify(resolvedInitialValue))
    }
  })

  // 监听 value 变化并更新存储
  watch(
    value,
    (newValue) => {
      try {
        if (newValue === null) {
          storage.removeItem(key)
        } else {
          storage.setItem(key, JSON.stringify(newValue))
        }
      } catch (error) {
        console.error('Failed to set stored value:', error)
      }
    },
    { deep: true }, // 使用深比较避免不必要的触发
  )

  return value as Ref<T>
}

export default useLocalStorage
