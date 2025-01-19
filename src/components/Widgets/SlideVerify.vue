<template>
  <div class="slider-container" :style="{ width: width + 'px', height: height + 'px' }">
    <div class="slider-track" ref="track">
      <div
        class="slider-thumb"
        :style="{ left: thumbPosition + 'px' }"
        @mousedown="startDrag"
        @touchstart="startDrag"
      ></div>
      <div class="slider-text">{{ slideText }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

const props = defineProps({
  width: {
    type: Number,
    default: 310,
  },
  height: {
    type: Number,
    default: 50,
  },
  text: {
    type: String,
    default: '向右滑动验证',
  },
  successText: {
    type: String,
    default: '验证成功',
  },
})

const emit = defineEmits(['success', 'fail', 'refresh'])

const thumbPosition = ref(0)
const isDragging = ref(false)
const isVerified = ref(false)

const slideText = computed(() => (isVerified.value ? props.successText : props.text))

const startDrag = (e: MouseEvent | TouchEvent) => {
  if (isVerified.value) return
  isDragging.value = true
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', onDrag)
  document.addEventListener('touchend', stopDrag)
}

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return
  let offsetX = 0
  if (e.type === 'mousemove') {
    offsetX = (e as MouseEvent).clientX - (e.target as HTMLElement).getBoundingClientRect().left
  } else if (e.type === 'touchmove') {
    offsetX =
      (e as TouchEvent).touches[0].clientX - (e.target as HTMLElement).getBoundingClientRect().left
  }
  thumbPosition.value = Math.min(props.width - 20, Math.max(0, offsetX))
}

const stopDrag = () => {
  if (!isDragging.value) return
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)

  if (thumbPosition.value >= props.width - 20) {
    isVerified.value = true
    emit('success')
  } else {
    emit('fail')
    thumbPosition.value = 0
  }
}

const refresh = () => {
  isVerified.value = false
  thumbPosition.value = 0
  emit('refresh')
}

onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
})

defineExpose({ refresh })
</script>

<style scoped>
.slider-container {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

.slider-track {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
}

.slider-thumb {
  width: 20px;
  height: 20px;
  background-color: #4caf50;
  position: absolute;
  left: 0;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 50%;
}

.slider-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #666;
  font-size: 14px;
}

.slider-container.slide-verify-success .slider-track {
  background-color: #4caf50;
}

.slider-container.slide-verify-success .slider-thumb {
  background-color: #fff;
}

.slider-container.slide-verify-success .slider-text {
  color: #fff;
}
</style>
