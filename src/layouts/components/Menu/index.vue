<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    theme="light"
    mode="inline"
    :items="menuItems"
    :inline-collapsed="true"
    collapsed
  >
  </a-menu>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { getIcon } from '@/assets/icons'
import useLayoutMenu from './useLayoutMenu'
const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(false)
import { VueElement, h, reactive } from 'vue'
const { menu } = useLayoutMenu()
interface MenuItem {
  key: string
  icon: string | any
  children?: MenuItem[]
  label: VueElement | string
}
const state = reactive({
  collapsed: false,
  selectedKeys: ['1'],
  openKeys: ['sub1'],
  preOpenKeys: ['sub1'],
})
const menuItems = ref<MenuItem[]>([])
watch(
  () => menu.value,
  (newMenu) => {
    if (newMenu && newMenu.length > 0) {
      menuItems.value = getMenuItems(newMenu)
    }
  },
  { immediate: true },
)
const getMenuItems = (menu: MenuItem[]): MenuItem[] => {
  return menu.map((item: any) => {
    return {
      key: item.path,
      icon: () => h(getIcon(item.icon)),
      children: item.children?.length > 0 ? getMenuItems(item.children) : undefined,
      label: item.title,
    }
  })
}
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed
  state.openKeys = state.collapsed ? [] : state.preOpenKeys
  console.log(state.collapsed)
}
</script>

<style lang="scss" scoped>
::v-deep(.ant-menu-title-content) {
  user-select: none;
}
</style>
