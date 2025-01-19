/*
 * @Description:
 * @FilePath: \ark-admin-front\src\main.ts
 */
import { createApp } from 'vue'
import { setupStore } from '@/stores'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css'
import router from './router'
import '@/design/index.css'
const app = createApp(App)
app.use(setupStore())
app.use(router)
app.use(Antd)
app.mount('#app')
