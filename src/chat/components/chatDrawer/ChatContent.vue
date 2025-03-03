<template>
  <div class="chat-content">
    <div class="chat-content-wrapper">
      <div class="chat-content-inner empty-description">
        <div class="welcome-tips">你好，我是 DeepSeek-R1-25012</div>
        <div class="ask-title">你可以试着问我</div>
        <div class="ask-demo">
          <div class="ask-demo-item">写个故事</div>
          <div class="ask-demo-item">预测下明天的股市</div>
        </div>
      </div>
      <div class="sender-content" :class="{ 'sender-content-active': SenderInputFocus }">
        <div class="online-search-tag" @click="handelToggleOnlineSearch">开启联网<i></i></div>
        <a-textarea v-model:value="senderValue" :bordered="false" @focus="handleSenderInputFocus"
          @blur="handleSenderInputBlur" placeholder="请输入问题，我可以完成智能解答、文案撰写、生成代码等多种任务..." auto-size>
        </a-textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const senderValue = ref<any>('');

/**
 * @description: 文字输入框聚焦
 * @return {*}
 */
const SenderInputFocus = ref<boolean>(false)
const handleSenderInputFocus = () => {
  console.log('1234');
  SenderInputFocus.value = true
};
const handleSenderInputBlur = () => {
  SenderInputFocus.value = false
}
/**
 * @description: 切换是否联网
 * @return {*}
 */
const handelToggleOnlineSearch = () => {
  console.log('开启联网');
}
</script>
<style scoped lang="scss">
.chat-content {
  width: 100%;
  height: calc(100% - 140px);
  background: linear-gradient(90deg, #f9f9f9, #ebf1f8);
  display: flex;
  flex: 1;
  opacity: 1;
  overflow-y: auto;
  padding: 73px 40px 10px;
  scroll-behavior: smooth;
  scrollbar-width: none;

  &-wrapper {
    width: 100%;
    position: relative;
  }

  &-inner {
    background-color: #fff;
    border: 1px solid #eaedf1;
    border-radius: 12px;
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 0;
    margin: 0 10px;
    padding: 24px 24px 16px;
  }

  .sender-content {
    width: 80%;
    height: 52px;
    background-color: #fff;
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid #91caff;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    display: flex;
    align-items: center;

    .online-search-tag {
      width: 120px;
      background-color: #f5f7fa;
      border-radius: 4px;
      color: #0c0d0e;
      display: flex;
      font-size: 12px;
      height: 26px;
      justify-content: center;
      align-items: center;
      padding: 0 6px;
      margin-left: 8px;
      border: 1px solid #eaedf1;
      cursor: pointer;

      i {
        background-color: #52c41a;
        border-radius: 50%;
        height: 4px;
        margin-left: 6px;
        width: 4px;
      }
    }
  }

  .online-search-tag:hover {
    border: 1px solid #4096ff;
  }

  .sender-content:hover {
    border: 1px solid #4096ff;
  }

  .sender-content-active {
    height: 100px;
    border: 1px solid #4096ff;
    box-shadow: 0 0 8px rgba(64, 150, 255, 0.3);
    /* 添加阴影效果 */
  }

  .empty-description {
    .welcome-tips {
      border-bottom: 1px solid #eff5fc;
      font-size: 18px;
      font-weight: 500;
      letter-spacing: 0.003em;
      line-height: 26px;
      padding-bottom: 16px;
      text-align: left;
    }

    .ask-title {
      margin: 16px 0;
      color: #8c8c8c;
    }

    .ask-demo {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;

      &-item {
        padding: 6px 16px;
        background-color: #f5f7fa;
        border: 1px solid #f5f7fa;
        border-radius: 6px;
        display: flex;
        align-items: center;
        transition: all 0.3s ease-in-out;
        /* 添加过渡效果 */
      }

      &-item:hover {
        border: 1px solid #b37feb;
        cursor: pointer;
        color: #b37feb;
        background-color: #f9f0ff;
      }
    }
  }
}
</style>