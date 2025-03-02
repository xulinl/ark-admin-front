<template>
  <div class="chat-container">
    <div class="history-content">
      <div class="title">历史对话</div>
      <div class="creat-btn">
        <div class="icon">+</div>
        创建新对话
      </div>
    </div>
    <div class="chat-content">
      <div class="chat-content__top"></div>
      <div class="chat-content-box">
        <div class="ask-value">
          <div class="text">{{ askValue }}</div>
          <img src="../../assets/images/kobe2.png" alt="" />
        </div>
        <div class="response-value">
          <div id="response"></div>
        </div>
      </div>

      <!-- <a-input-search
        class=""
        style="height: 50px"
        v-model:value="askValue"
        placeholder="我是科孝子，你可以问我任何关于牢大的问题..."
      >
        <template #enterButton>
          <a-button>Custom</a-button>
        </template>
      </a-input-search> -->
      <div class="chat-content-input">
        <a-input-search
          v-model:value="askValue"
          placeholder="我是科孝子，你可以问我任何关于牢大的问题..."
          enter-button="发送"
          size="large"
          width="600"
          style="width: 600px; margin: 0 auto"
          @search="main"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import OpenAI from 'openai'
import { onMounted, ref } from 'vue'
import { marked } from 'marked'

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-fad3fa68adf5437da9554ee81224ae26',
  dangerouslyAllowBrowser: true,
})
const askValue = ref('')
const main = async () => {
  const responseElement = document.getElementById('response')
  if (!responseElement) return

  responseElement.innerHTML = '' // 清空之前的响应内容

  const stream = await openai.chat.completions.create({
    messages: [{ role: 'system', content: askValue.value }],
    model: 'deepseek-chat',
    stream: true,
    type: 'json_object',
  })

  let markdownContent = ''

  for await (const part of stream) {
    const content = part.choices[0]?.delta?.content
    if (content) {
      markdownContent += content
      responseElement.innerHTML = marked(markdownContent)
    }
  }
}
</script>

<style scoped lang="scss">
.chat-container {
  width: 100%;
  height: 93vh;
  background: #fff;
  display: flex;
}
.history-content {
  width: 240px;
  height: 100%;
  background: #f0f3f9;
  border-right: 1px solid #eaedf1;
  padding: 16px;
  .title {
    font-size: 16px;
  }
  .creat-btn {
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
    background-color: #fff;
    border-radius: 4px;
    margin-top: 40px;
    .icon {
      font-size: 22px;
      display: flex;
      align-items: center;
      padding-bottom: 5px;
      margin-right: 4px;
    }
  }
}
.chat-content {
  flex: 1;
  height: 100%;
  background: linear-gradient(90deg, #f9f9f9, #ebf1f8);
  background-image: url(../../assets/images/kobe.jpeg) no-repeat center top / 100% auto;
  &__top {
    height: 60px;
    background-color: #fff;
  }
  .chat-content-box {
    position: relative;
    margin: 0 auto;
    margin-top: 60px;
    width: 70%;
    border-radius: 12px;
    height: calc(80% - 60px);
    overflow-y: auto;
    background: #fff;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .ask-value {
      position: absolute;
      top: 20px;
      width: 90%;
      text-align: center;

      display: flex;
      align-items: center;
      justify-content: end;
      .text {
        font-size: 20px;
      }
      img {
        width: 60px;
        height: 60px;
        border-radius: 100%;
        margin-left: 24px;
        background-image: url(../../assets/images/kobe.jpeg);
      }
    }
    .response-value {
      font-size: 16px;
      width: 100%;
      margin-top: 80px;
      height: 80%;
      overflow-y: auto;
    }
  }
  .chat-content-input {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    margin-top: 40px;
    width: 70%;
    border-radius: 12px;
    height: 60px;
  }
}
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
  display: inline-block;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
