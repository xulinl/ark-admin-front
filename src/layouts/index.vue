<template>
  <a-layout class="w-full h-full">
    <Siderbar></Siderbar>
    <div class="w-full h-full">
      <Header></Header>
      <Content></Content>
    </div>
  </a-layout>
  <Chat></Chat>
</template>

<script setup lang="ts">
import Siderbar from './components/Siderbar/index.vue'
import Header from './components/Header/index.vue'
import Content from './components/Content/index.vue'
import Chat from '@/chat/index.vue'
</script>

<style scoped lang="scss"></style>
