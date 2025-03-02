<template>
  <a-layout-sider width="223px" v-model:collapsed="collapsed" :trigger="null" collapsible>
    <Logo />
    <Menu></Menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
import Menu from '../Menu/index.vue'
import { onMounted, ref } from 'vue'
const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(false)
</script>

<style scoped lang="scss">
::v-deep(.ant-layout .ant-layout-sider) {
  width: 223px !important;
}
::v-deep(.ant-layout-sider-children) {
  background-color: #fff;
}
</style>
