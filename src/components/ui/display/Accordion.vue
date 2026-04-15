<script setup lang="ts">
import { ref, provide } from 'vue'

const props = withDefaults(
  defineProps<{
    type?: 'single' | 'multiple'
    defaultValue?: string | string[]
  }>(),
  { type: 'single' },
)

const opened = ref<string[]>(
  Array.isArray(props.defaultValue)
    ? props.defaultValue
    : props.defaultValue
    ? [props.defaultValue]
    : [],
)

function toggle(value: string) {
  if (props.type === 'single') {
    opened.value = opened.value.includes(value) ? [] : [value]
  } else {
    opened.value = opened.value.includes(value)
      ? opened.value.filter(v => v !== value)
      : [...opened.value, value]
  }
}

provide('accordion', { opened, toggle })
</script>

<template>
  <div class="accordion" data-slot="accordion">
    <slot />
  </div>
</template>

<style scoped>
.accordion { width: 100%; }
</style>
