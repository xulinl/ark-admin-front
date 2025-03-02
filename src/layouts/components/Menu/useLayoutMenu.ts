import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'

export default function useLayoutMenu() {
  const router = useRouter()
  const route = useRoute()
  const menu = ref<any[]>([])

  const allRoutes = router.getRoutes()

  onMounted(() => {
    updateMenu()
  })

  watch(
    () => router.getRoutes(),
    () => {
      updateMenu()
    },
  )

  const updateMenu = () => {
    const rootRoute = allRoutes.find((route) => route.path === '/')
    if (rootRoute && rootRoute.children) {
      menu.value = rootRoute.children.map((child) => ({
        path: child.path,
        name: child.name,
        title: child.meta?.title,
        icon: child.meta?.icon,
        children:
          child.children?.map((subChild) => ({
            path: subChild.path,
            name: subChild.name,
            title: subChild.meta?.title,
            icon: subChild.meta?.icon,
          })) || null,
      }))
    }
  }

  return { menu }
}
