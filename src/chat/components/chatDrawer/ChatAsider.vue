<template>
  <a-layout>
    <div class="asider-container">
      <a-layout-sider :collapsed="!asiderWarpperVisible" collapsible :collapsedWidth="64">
        <div class="asider">
          <div class="flex items-center justify-center pb-4 pt-4">
            <img class="w-[40px]"
              src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp" />
            <div class="truncate text-xl font-semibold">Ark AI助手</div>
          </div>
          <div>
            <a-tooltip title="创建新对话" placement="left">
              <a-button class="creat-btn" @click="creatNewChat">
                <PlusOutlined /><span v-if="asiderWarpperVisible" class="truncate">创建新对话</span>
              </a-button>
            </a-tooltip>
            <div class="history-list">
              <div class="history-list__item" v-for="(item, index) in chatHistory" :key="index">
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </a-layout-sider>
      <div class="toggle-warp-btn" @click="toggleAsiderWarpper">
        <div v-if="asiderWarpperVisible">
          <a-tooltip title="收缩侧边栏">
            <DoubleLeftOutlined />
          </a-tooltip>
        </div>
        <div v-else>
          <a-tooltip title="展开侧边栏">
            <DoubleRightOutlined />
          </a-tooltip>
        </div>
      </div>
    </div>
  </a-layout>

</template>

<script setup lang="ts">
import { PlusOutlined, DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons-vue'
import { onMounted, ref } from 'vue'

// 创建新对话
const chatHistory = ref<any[]>([])
onMounted(() => {
  chatHistory.value = ['111']
})

const creatNewChat = () => {
  console.log('创建新对话', chatHistory.value)
}

/**
 * @description: 切换侧边栏显示隐藏
 * @return {*}
 */
const asiderWarpperVisible = ref(false);
const toggleAsiderWarpper = () => {
  asiderWarpperVisible.value = !asiderWarpperVisible.value;
  console.log('显示隐藏侧边栏')
}
</script>

<style lang="scss" scoped>
.asider-container {
  position: relative;
  height: 100%;
}

.asider {
  width: 100%;
  height: 100%;
  padding: 0 12px;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  background-color: #f0f3f9;
  border-right: 1px solid #eaedf1;
}

.asider-hidden {
  width: 40px;
}

.creat-btn {
  height: 36px;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin: 0 auto;
  font-size: 15px;
  padding: 0;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.history-list {
  margin-top: 24px;
}

.toggle-warp-btn {
  align-items: center;
  background: #f0f3f9;
  border: 1px solid #eaedf1;
  border-radius: 8px;
  color: #8483b1;
  cursor: pointer;
  display: flex;
  height: 44px;
  right: -30px;
  margin-left: 6px;
  margin-top: -22px;
  position: absolute;
  top: 50%;
  transition: left .2s;
  width: 20px;
  z-index: 1000;

  div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.toggle-warp-btn:hover {
  background-color: #f0f5ff;
  color: #4096ff;
  transition: all .5s ease-in-out;
}

:deep(.ant-layout-sider-trigger) {
  display: none !important;
}

:deep(.ant-layout-sider-has-trigger) {
  height: 100vh !important;
  padding-bottom: 0;
}
</style>