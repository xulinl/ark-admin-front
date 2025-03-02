<template>
  <div
    ref="buttonRef"
    :style="buttonStyle"
    @mousedown="startDrag"
    @touchstart="startDrag"
    @click="handleClick"
  >
    AI
    <div v-for="(drop, index) in drops" :key="index" :style="drop.style" class="drop"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount, nextTick, onMounted } from 'vue'

const MARGIN = 24
const SNAP_THRESHOLD = 0.25 // 25%屏幕宽度/高度触发吸附
const buttonRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
// 在 setup 区域顶部添加计算函数
const getInitialPosition = () => {
  return {
    x: window.innerWidth - 60 - MARGIN, // 60为按钮宽度
    y: window.innerHeight - 60 - MARGIN, // 60为按钮高度
  }
}
const buttonStyle = ref({
  position: 'fixed',
  left: `${getInitialPosition().x}px`,
  top: `${getInitialPosition().y}px`,
  cursor: 'pointer',
  zIndex: 9999,
  userSelect: 'none',
  touchAction: 'none',
  transition: 'all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
  width: '60px',
  height: '60px',
  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', // 水滴形状
  background: 'radial-gradient(circle, #00d2ff, #3a7bd5)',
  boxShadow: `
    0 0 20px rgba(58, 123, 213, 0.8),
    0 0 40px rgba(58, 123, 213, 0.6),
    0 0 60px rgba(58, 123, 213, 0.4),
    0 0 80px rgba(58, 123, 213, 0.2),
    0 0 100px rgba(58, 123, 213, 0.1),
    inset 0 0 10px rgba(255, 255, 255, 0.5),
    inset 0 0 20px rgba(255, 255, 255, 0.3)
  `,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  fontSize: '18px',
  fontWeight: 'bold',
  textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
  transform: 'translateZ(0)',
})

let startX = 0
let startY = 0
let initialLeft = 0
let initialTop = 0

let chatVisible = ref(false)
const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()
const handleClick = () => {
  chatVisible.value = !chatVisible.value
  // 触发事件传递最新值
  emit('update:visible', chatVisible.value)
}

const startDrag = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true
  buttonStyle.value.transition = 'none'
  const btn = buttonRef.value
  if (!btn) return
  initialLeft = parseFloat(buttonStyle.value.left) || btn.offsetLeft
  initialTop = parseFloat(buttonStyle.value.top) || btn.offsetTop
  const { clientX, clientY } = getEventCoordinates(e)
  startX = clientX
  startY = clientY
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('touchmove', onDrag, { passive: false })
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchend', stopDrag)
}

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return
  e.preventDefault()
  const btn = buttonRef.value
  if (!btn) return
  const { clientX, clientY } = getEventCoordinates(e)
  const btnWidth = btn.offsetWidth
  const btnHeight = btn.offsetHeight
  const maxX = window.innerWidth - btnWidth - MARGIN
  const maxY = window.innerHeight - btnHeight - MARGIN
  const deltaX = clientX - startX
  const deltaY = clientY - startY
  let newLeft = initialLeft + deltaX
  let newTop = initialTop + deltaY
  newLeft = Math.max(MARGIN, Math.min(newLeft, maxX))
  newTop = Math.max(MARGIN, Math.min(newTop, maxY))
  buttonStyle.value.left = `${newLeft}px`
  buttonStyle.value.top = `${newTop}px`

  // 生成小水滴
  createDrop()
}

const stopDrag = () => {
  isDragging.value = false
  buttonStyle.value.transition = 'all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)'
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchend', stopDrag)
  nextTick(() => {
    const btn = buttonRef.value
    if (!btn) return
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    const btnSize = {
      width: btn.offsetWidth,
      height: btn.offsetHeight,
    }
    const currentPos = {
      x: parseFloat(buttonStyle.value.left),
      y: parseFloat(buttonStyle.value.top),
    }
    const center = {
      x: currentPos.x + btnSize.width / 2,
      y: currentPos.y + btnSize.height / 2,
    }
    const snapOptions = {
      left: center.x < viewport.width * SNAP_THRESHOLD,
      right: center.x > viewport.width * (1 - SNAP_THRESHOLD),
      top: center.y < viewport.height * SNAP_THRESHOLD,
      bottom: center.y > viewport.height * (1 - SNAP_THRESHOLD),
    }
    let targetX = currentPos.x
    let targetY = currentPos.y
    if (snapOptions.left) {
      targetX = MARGIN
    } else if (snapOptions.right) {
      targetX = viewport.width - btnSize.width - MARGIN
    }
    if (snapOptions.top) {
      targetY = MARGIN
    } else if (snapOptions.bottom) {
      targetY = viewport.height - btnSize.height - MARGIN
    }
    if (snapOptions.left || snapOptions.right) {
      targetY = Math.max(MARGIN, Math.min(targetY, viewport.height - btnSize.height - MARGIN))
    }
    if (snapOptions.top || snapOptions.bottom) {
      targetX = Math.max(MARGIN, Math.min(targetX, viewport.width - btnSize.width - MARGIN))
    }
    buttonStyle.value.left = `${targetX}px`
    buttonStyle.value.top = `${targetY}px`
  })
}

const getEventCoordinates = (e: MouseEvent | TouchEvent) => {
  if (e instanceof TouchEvent) {
    return {
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY,
    }
  }
  return {
    clientX: e.clientX,
    clientY: e.clientY,
  }
}

// 小水滴效果
const drops = ref<{ style: any }[]>([])

const createDrop = () => {
  const btn = buttonRef.value
  if (!btn) return

  const drop = {
    style: {
      position: 'fixed',
      left: `${parseFloat(buttonStyle.value.left) + btn.offsetWidth / 2 - 5}px`,
      top: `${parseFloat(buttonStyle.value.top) + btn.offsetHeight}px`,
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: 'rgba(135, 206, 250, 0.8)',
      animation: 'drop-animation 1s linear forwards',
    },
  }

  drops.value.push(drop)

  // 移除掉落后的小水滴
  setTimeout(() => {
    drops.value.shift()
  }, 1000)
}

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchend', stopDrag)
})
</script>

<style scoped>
/* 添加水滴效果 */
div {
  animation:
    float 3s infinite ease-in-out,
    drip 2s infinite ease-in-out;
  position: relative;
  overflow: hidden;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* 水滴动画 */
@keyframes drip {
  0%,
  100% {
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  }
  50% {
    border-radius: 50% 50% 60% 60% / 50% 50% 50% 50%;
  }
}

/* 增强发光效果 */
@keyframes glow {
  0%,
  100% {
    box-shadow:
      0 0 20px rgba(58, 123, 213, 0.8),
      0 0 40px rgba(58, 123, 213, 0.6),
      0 0 60px rgba(58, 123, 213, 0.4),
      0 0 80px rgba(58, 123, 213, 0.2),
      0 0 100px rgba(58, 123, 213, 0.1),
      inset 0 0 10px rgba(255, 255, 255, 0.5),
      inset 0 0 20px rgba(255, 255, 255, 0.3);
  }
  50% {
    box-shadow:
      0 0 30px rgba(58, 123, 213, 1),
      0 0 60px rgba(58, 123, 213, 0.8),
      0 0 90px rgba(58, 123, 213, 0.6),
      0 0 120px rgba(58, 123, 213, 0.4),
      0 0 150px rgba(58, 123, 213, 0.2),
      inset 0 0 15px rgba(255, 255, 255, 0.7),
      inset 0 0 30px rgba(255, 255, 255, 0.5);
  }
}

/* 小水滴动画 */
.drop {
  position: fixed;
  width: 10px;
  height: 10px;
  border-radius: '50%';
  background-color: rgba(135, 206, 250, 0.8);
  animation: drop-animation 1s linear forwards;
}

@keyframes drop-animation {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100px);
    opacity: 0;
  }
}
</style>
