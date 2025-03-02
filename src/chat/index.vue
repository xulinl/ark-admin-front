<template>
  <FloatButton v-model:visible="chatVisible" @update:visible="handleVisibleUpdate"></FloatButton>
  <ChatDrawer v-model:visible="chatVisible"></ChatDrawer>
</template>

<script setup lang="ts">
import ChatDrawer from './components/chatDrawer/index.vue'
import { ref } from 'vue'
import FloatButton from './components/FloatButton.vue'
// 父组件逻辑
const chatVisible = ref(true)
const handleVisibleUpdate = (val: boolean) => {
  chatVisible.value = val
}
</script>

<style scoped></style>
