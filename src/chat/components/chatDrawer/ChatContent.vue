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
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
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
