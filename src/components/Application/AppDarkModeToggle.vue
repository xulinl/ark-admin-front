<!--
 * @Description: 主题切换组件
 * @FilePath: \ark-admin-front\src\components\Application\AppDarkModeToggle.vue
-->
<template>
  <div class="w-5 h-5 cursor-pointer theme-toggle" @click="toggleTheme">
    <img
      :src="iconSrc"
      :class="{ 'sun-icon': isLight, 'moon-icon': !isLight }"
      alt="Theme Toggle"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import sunIcon from '@/assets/images/sun.png'
import moonIcon from '@/assets/images/moon.png'

const isLight = ref(true)

const iconSrc = computed(() => {
  return isLight.value ? sunIcon : moonIcon
})

const toggleTheme = () => {
  isLight.value = !isLight.value
}
</script>

<style scoped lang="scss">
.sun-icon {
  transition: opacity 0.5s ease-in-out;
}

.moon-icon {
  transition: opacity 0.5s ease-in-out;
}

/* 添加动画效果 */
.sun-icon {
  animation: sunFadeOut 0.5s forwards;
}

.moon-icon {
  animation: moonFadeIn 0.5s forwards;
}

@keyframes sunFadeOut {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes moonFadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
