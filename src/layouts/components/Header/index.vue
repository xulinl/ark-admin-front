<template>
  <a-layout-header style="background: #fff; padding: 0; border-left: 1px solid #eaeaea">
    <div class="flex justify-between">
      <div class="flex-1 header-left"></div>
      <div class="pr-3 hover:width-[40px] hover:height-[40px] hover:bg-slate-200">
        <a-avatar style="background-color: #f56a00">{{ userInfo?.username }}</a-avatar>
      </div>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UserInfo } from '@/types/user'
const collapsed = ref<boolean>(false)
import { useUserStore } from '@/stores/'
const userStore = useUserStore()
let userInfo = ref<UserInfo>()
userInfo.value = userStore.userInfo
</script>

<style lang="scss" scoped>
::v-deep(.ant-layout.ant-layout-header) {
  height: 50px !important;
}
</style>
