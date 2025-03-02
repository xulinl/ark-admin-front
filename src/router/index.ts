import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/layouts/index.vue'
import { useLocalStorage } from '@vueuse/core'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { noRequiresAuth: true },
    },
    {
      path: '/',
      redirect: '/dashboard',
      component: Layout,
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('@/views/dashboard/index.vue'),
          meta: {
            title: '概览',
            icon: 'AppstoreAddOutlined',
            keepAlive: true,
          },
        },
        {
          path: '/demo',
          name: 'Demo',
          meta: { title: '演示', icon: 'CreditCardOutlined' },
          children: [
            {
              path: '/demo/demo1',
              name: 'demo1',
              component: () => import('@/views/demo/index.vue'),
              meta: { title: '演示1', icon: 'VideoCameraOutlined' },
            },
            {
              path: '/demo/demo2',
              name: 'demo2',
              component: () => import('@/views/demo/index.vue'),
              meta: { title: '演示2', icon: 'UploadOutlined' },
            },
            {
              path: '/demo/demo3',
              name: 'demo3',
              component: () => import('@/views/demo/index.vue'),
              meta: { title: '演示3', icon: 'ExclamationCircleOutlined' },
            },
            {
              path: '/demo/demo4',
              name: 'demo4',
              component: () => import('@/views/demo/index.vue'),
              meta: { title: '演示4', icon: 'UserOutlined' },
            },
            {
              path: '/demo/demo5',
              name: 'demo5',
              component: () => import('@/views/demo/index.vue'),
              meta: { title: '演示5', icon: 'VideoCameraOutlined' },
            },
          ],
        },
      ],
    },
  ],
})

// 导航守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = useLocalStorage('token', null).value
  console.log(to)
  if (to.matched.some((record) => !record.meta.noRequiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    if (isAuthenticated && to.name === 'login') {
      next({ name: 'dashboard' })
    } else {
      next()
    }
  }
})

export default router
