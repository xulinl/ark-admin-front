<template>
  <a-drawer :open="visible" class="custom-class" root-class-name="root-class-name" :headerStyle="{ display: 'none' }"
    :bodyStyle="{ padding: 0 }" placement="left" @after-open-change="afterOpenChange" width="1200px">
    <div class="chat-container">
      <div class="chat-container-left">
        <ChatAsider />
      </div>
      <div class="chat-container-right">
        <ChatHeader />
        <ChatContent />
      </div>
    </div>
  </a-drawer>
</template>
<script lang="ts" setup>
import ChatAsider from './ChatAsider.vue'
import ChatHeader from './ChatHeader.vue'
import ChatContent from './ChatContent.vue'
import { ref } from 'vue'
const open = ref<boolean>(false)
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})
const afterOpenChange = (bool: boolean) => {
  console.log('open', bool)
}

const showDrawer = () => {
  open.value = true
}
</script>

<style scoped lang="scss">
.chat-container {
  display: flex;
  height: 100%;

  .chat-container-right {
    flex: 1;
    flex-direction: column;
    height: 100%;
  }
}
</style>
