<!--
 * @FilePath: \ark-admin-front\src\views\login\components\ToolBar.vue
 * @Description: 应用全局设置工具栏
-->
<template>
  <div class="top-0 right-0 m-3 app-setting-button position-absolute end-0">
    <AppDarkModeToggle></AppDarkModeToggle>
  </div>
</template>

<script setup lang="ts">
import { AppDarkModeToggle } from '@/components/Widgets'
</script>

<style scoped lang="scss">
.app-setting-button {
  width: 120px; /* 按钮宽度 */
  height: 30px; /* 按钮高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(128, 128, 128, 0.1); /* 灰色背景透明 */
  border-radius: 30px; /* 胶囊按钮效果 */
  backdrop-filter: blur(10px); /* 毛玻璃效果 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 轻微的阴影效果 */
  transition:
    background 0.5s ease-in-out,
    box-shadow 0.5s ease-in-out; /* 平滑过渡效果 */
  /* 鼠标悬停时改变背景色 */
  &:hover {
    background: rgba(128, 128, 128, 0.15);
  }
}
</style>
