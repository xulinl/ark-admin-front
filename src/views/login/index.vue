<!--
 * @FilePath: \ark-admin-front\src\views\login\index.vue
 * @@Description: 登录页面

-->
<template>
  <div>
    <Logo></Logo>
    <AppSettingButton></AppSettingButton>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Logo from './components/Logo.vue'
import AppSettingButton from './components/AppSettingButton.vue'
</script>

<style lang="scss" scoped></style>
