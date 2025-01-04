<template>
  <div class="flex items-center justify-start flex-1 mt-4 ml-4 w-50">
    <div class="w-10 h-10">
      <img src="@/assets/svg/logo.svg" alt="" />
    </div>
    <div class="ml-2 text-xl font-semibold">{{ APP_NAME }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { defineComponent } from 'vue'
import { APP_NAME } from '@/enums/appEnums'
defineComponent({
  name: 'Logo',
})
</script>

<style lang="scss" scoped></style>
