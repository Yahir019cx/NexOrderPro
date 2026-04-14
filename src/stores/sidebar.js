import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
  const isExpanded = ref(true)
  const activeScreen = ref('home')

  function toggle() {
    isExpanded.value = !isExpanded.value
  }

  function navigate(id) {
    activeScreen.value = id
  }

  return { isExpanded, activeScreen, toggle, navigate }
})
