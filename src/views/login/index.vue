<!--
 * @FilePath: \ark-admin-front\src\views\login\index.vue
 * @@Description: 登录页面

-->
<template>
  <div class="relative w-full h-full bg-slate-100">
    <div class="absolute top-0 left-0 z-10 w-2/3 h-full login-background"></div>
    <div class="absolute top-0 left-0 z-10 w-2/3 -translate-y-1/2 h-1/2 top-1/2">
      <PosterImg
        class="absolute w-64 h-64 transform -translate-x-1/2 -translate-y-2/3 top-1/3 left-1/2 animate-poster"
      ></PosterImg>
      <div class="absolute transform -translate-x-1/2 top-[70%] left-1/2">
        <div class="text-2xl font-semi-bold">{{ APP_DESC }}</div>
        <div class="mt-2 text-sm text-center">{{ APP_DESC_SUB }}</div>
      </div>
    </div>
    <div class="absolute top-0 right-0 z-20 flex justify-between w-full h-16">
      <Logo></Logo>
      <ToolBar></ToolBar>
    </div>
    <div class="absolute top-0 right-0 w-1/3 h-full">
      <LoginForm></LoginForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Logo from './components/Logo.vue'
import ToolBar from './components/ToolBar.vue'
import LoginForm from './components/LoginForm.vue'
import { PosterImg } from '@/components/Widgets'
import { APP_DESC, APP_DESC_SUB } from '@/enums/appEnums'
</script>

<style lang="scss" scoped>
.login-background {
  background: linear-gradient(
    154deg,
    rgba(7, 7, 9, 0.09) 30%,
    var(--color-blue-3) 48%,
    rgba(7, 7, 9, 0.09) 64%
  );
  filter: blur(100px);
}

.dark {
  .login-background {
    background: linear-gradient(
      154deg,
      #07070915 30%,
      hsl(var(--color-blue-6) / 20%) 48%,
      #07070915 64%
    );
    filter: blur(100px);
  }
}
@keyframes posterAnimation {
  0%,
  100% {
    transform: translate(-50%, -50%) translateY(-12px);
  }
  50% {
    transform: translate(-50%, -50%) translateY(12px);
  }
}

.animate-poster {
  animation: posterAnimation 4s ease-in-out infinite;
}
</style>
