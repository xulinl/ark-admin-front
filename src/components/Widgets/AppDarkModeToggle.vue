<template>
  <div class="w-5 h-5 cursor-pointer theme-toggle" @click="toggleTheme">
    <transition name="fade" mode="out-in">
      <img
        :key="iconSrc"
        :src="iconSrc"
        :class="{ 'sun-icon': isLight, 'moon-icon': !isLight }"
        alt="Theme Toggle"
      />
    </transition>
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
.theme-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* 太阳和月亮的图标 */
.theme-toggle img {
  width: 100%;
  height: 100%;
  transition:
    opacity 0.5s ease-in-out,
    transform 0.5s ease-in-out;
}

/* 太阳图标的旋转效果 */
.sun-icon {
  transform-origin: center;
}

/* 淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease-in-out,
    transform 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

/* 太阳图标旋转30度 */
.sun-icon.theme-toggle-enter,
.sun-icon.theme-toggle-leave-to {
  transform: rotate(30deg);
}

/* 月亮图标的淡入淡出效果 */
.moon-icon.theme-toggle-enter,
.moon-icon.theme-toggle-leave-to {
  opacity: 1;
}
</style>
