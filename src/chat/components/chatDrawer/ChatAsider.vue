<template>
  <div class="asider">
    <div class="flex items-center justify-center p-4">
      <img
        class="w-[40px]"
        src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
      />
      <span class="ml-2 text-xl font-semibold">Ark AI助手</span>
    </div>
    <div>
      <a-button class="creat-btn" @click="creatNewChat"><PlusOutlined />创建新对话</a-button>
      <div class="history-list">
        <div class="history-list__item" v-for="(item, index) in chatHistory" :key="index">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue'
import { onMounted, ref } from 'vue'

// 创建新对话
const chatHistory = ref<any[]>([])
onMounted(() => {
  chatHistory.value = ['111']
})

const creatNewChat = () => {
  console.log('创建新对话', chatHistory.value)
}
</script>

<style lang="scss" scoped>
.asider {
  width: 240px;
  height: 100%;
  padding: 0 12px;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  // background: linear-gradient(to bottom, #d5dee7 0%, #e8ebf2 50%, #e2e7ed 100%),
  //   linear-gradient(
  //     to bottom,
  //     rgba(0, 0, 0, 0.02) 50%,
  //     rgba(255, 255, 255, 0.02) 61%,
  //     rgba(0, 0, 0, 0.02) 73%
  //   ),
  //   linear-gradient(33deg, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%);
  // background-blend-mode: normal, color-burn;
  background-color: #f0f3f9;
  border-right: 1px solid #eaedf1;
}
.creat-btn {
  height: 40px;
  width: 200px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin: 0 auto;
  font-size: 15px;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}
.history-list {
  margin-top: 24px;
}
</style>
