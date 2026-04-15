<script setup lang="ts">
import { inject, computed } from 'vue'

const props = defineProps<{ value: string }>()

const tabs = inject<{ active: { value: string } }>('tabs')

const isActive = computed(() => tabs?.active.value === props.value)
</script>

<template>
  <div v-if="isActive" class="tabs-content" role="tabpanel" data-slot="tabs-content">
    <slot />
  </div>
</template>

<style scoped>
.tabs-content { outline: none; }
</style>
