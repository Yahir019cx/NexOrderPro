<script setup lang="ts">
import { ref, provide } from 'vue'

const props = defineProps<{
  defaultValue?: string
  modelValue?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const active = ref(props.modelValue ?? props.defaultValue ?? '')

provide('tabs', {
  active,
  select(val: string) {
    active.value = val
    emit('update:modelValue', val)
  },
})
</script>

<template>
  <div class="tabs" data-slot="tabs">
    <slot />
  </div>
</template>

<style scoped>
.tabs { display: flex; flex-direction: column; gap: 8px; }
</style>
