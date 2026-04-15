<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

const props = defineProps<{
  onClick: () => void
}>()
</script>

<template>
  <button
    @click="onClick"
    class="
      fixed bottom-8 right-8 z-50
      w-16 h-16 rounded-full
      text-white
      flex items-center justify-center
      transition-all duration-200
      active:scale-95
    "
    :style="{ backgroundColor: 'var(--brand)' }"
    aria-label="Agregar nueva mesa"
  >
    <Plus class="w-7 h-7" :stroke-width="2.5" />
  </button>
</template>
