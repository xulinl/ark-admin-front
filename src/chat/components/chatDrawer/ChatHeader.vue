<template>
  <div class="chat-header">
    <div class="chat-header__top">
      <a-space wrap>
        <a-button :icon="h(ClearOutlined)">清除上下文</a-button>
        <a-button type="primary" :icon="h(PlusOutlined)">添加模型对比</a-button>
      </a-space>
    </div>
    <div class="model-card">
      <div class="model-card__left">
        <img class="model-logo" tabindex="0" draggable="false"
          src="https://ark-auto-2100466578-cn-beijing-default.tos-cn-beijing.volces.com/model_cardDdnKffURUE.png" />
        <div class="model-name">DeepSeek-R1</div>
        <div class="divider-line"></div>
        <div>250120</div>
        <div class="deep-think-tag">深度思考 <i></i></div>
      </div>
      <div class="model-card__right">
        <div class="icon">
          <a-tooltip title="更换模型">
            <SwapOutlined />
          </a-tooltip>
        </div>
        <div class="divider-line"></div>
        <div class="icon">
          <a-tooltip title="参数设置">
            <DeploymentUnitOutlined />
          </a-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import {
  PlusOutlined,
  ClearOutlined,
  SwapOutlined,
  DeploymentUnitOutlined,
} from '@ant-design/icons-vue'
</script>

<style lang="scss" scoped>
.chat-header {
  width: 100%;
  height: 130px;
  background-image: url('@/assets/images/chat-header.jpg');
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 32px;
  border-bottom: 1px solid #e1e8ff;
  box-shadow: 0 2px 6px 0 #d5d7ed80;
  background-position: top;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  &__top {
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: flex-end;

    :deep(.ant-btn) {
      display: flex;
      align-items: center;
    }
  }

  .model-card {
    width: 800px;
    height: 60px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 15px 32px 0 #0000000a;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__left {
      flex: 1;
      display: flex;
      align-items: center;

      .model-logo {
        width: 38px;
        height: 38px;
        border: 1px solid #eaeaea;
        border-radius: 4px;
      }

      .model-name {
        font-size: 17px;
        font-weight: 600;
        margin-left: 8px;
      }

      .deep-think-tag {
        align-items: center;
        align-self: center;
        background-color: #f1f3f5;
        border-radius: 4px;
        color: #0c0d0e;
        display: flex;
        flex-direction: row;
        flex-shrink: 0;
        font-size: 12px;
        font-weight: 400;
        height: 22px;
        justify-content: center;
        line-height: 20px;
        padding: 0 6px;
        margin-left: 8px;

        i {
          background-color: #52c41a;
          border-radius: 50%;
          height: 4px;
          margin-left: 6px;
          width: 4px;
        }
      }
    }

    &__right {
      display: flex;
      align-items: center;
      font-size: 16px;
    }

    .divider-line {
      margin: 0 8px;
      height: 16px;
      width: 1px;
      background-color: rgba(0, 0, 0, 0.15);
    }

    .icon {
      cursor: pointer;
      font-size: 18px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon:hover {
      background-color: #f0f5ff;
      color: #4096ff;
      border-radius: 4px;
      transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      user-select: none;
    }
  }
}
</style>
