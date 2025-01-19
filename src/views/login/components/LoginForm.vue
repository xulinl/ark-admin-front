<!--
 * @Description:
 * @FilePath: \ark-admin-front\src\views\login\components\LoginForm.vue
-->
<template>
  <div class="relative h-full bg-white shadow-sm">
    <div class="login-form">
      <div class="flex items-center text-3xl font-semibold">
        {{ LOGIN_FORM_NAME }}
        <img class="w-[34px] h-[34px] ml-2" src="@/assets/images/welcome-hands.png" alt="" />
      </div>
      <div>
        <a-form
          ref="loginFormRef"
          :model="formState"
          autocomplete="off"
          class="w-[448px] max-w-[448px] min-w-[300px] mt-[24px]"
        >
          <a-form-item name="username" :rules="[{ required: true, message: '请输入您的用户名！' }]">
            <a-input
              class="h-[40px]"
              placeholder="请输入您的用户名"
              v-model:value="formState.username"
            />
          </a-form-item>
          <a-form-item name="password" :rules="[{ required: true, message: '请输入您的密码！' }]">
            <a-input-password
              class="h-[40px]"
              placeholder="请输入您的密码"
              v-model:value="formState.password"
            />
          </a-form-item>
          <a-form-item name="remember">
            <a-checkbox v-model:checked="formState.remember">{{ REMEMBER_ACCOUNT }}</a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-button
              class="w-full h-[36px]"
              type="primary"
              html-type="submit"
              @click="handleLogin"
              >{{ LOGIN_BTN_TEXT }}</a-button
            >
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="absolute bottom-[24px] w-full text-center">{{ APP_COPYRIGHT }}</div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/index'
import {
  APP_COPYRIGHT,
  LOGIN_FORM_NAME,
  REMEMBER_ACCOUNT,
  LOGIN_BTN_TEXT,
} from '@/enums/appEnums.ts'
import { reactive, ref, unref } from 'vue'

interface FormState {
  username: string
  password: string
  remember: boolean
}

const formState = reactive<FormState>({
  username: '徐林',
  password: '123456',
  remember: true,
})
const authStore = useAuthStore()
const loginFormRef = ref<any>(null)

// 登录
const handleLogin = async () => {
  const form = unref(loginFormRef)
  form.validate().then(async (values: FormState) => {
    await authStore.login(formState)
  })
}
</script>

<style scoped lang="scss">
.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
