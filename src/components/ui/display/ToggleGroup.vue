<script setup lang="ts">
import { provide } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string | string[]
    type?: 'single' | 'multiple'
    variant?: 'default' | 'outline'
    size?: 'default' | 'sm' | 'lg'
  }>(),
  { type: 'single', variant: 'default', size: 'default' },
)

const emit = defineEmits<{ 'update:modelValue': [value: string | string[]] }>()

function select(val: string) {
  if (props.type === 'single') {
    emit('update:modelValue', props.modelValue === val ? '' : val)
  } else {
    const current = Array.isArray(props.modelValue) ? props.modelValue : []
    emit(
      'update:modelValue',
      current.includes(val) ? current.filter(v => v !== val) : [...current, val],
    )
  }
}

function isActive(val: string) {
  return Array.isArray(props.modelValue)
    ? props.modelValue.includes(val)
    : props.modelValue === val
}

provide('toggleGroup', { select, isActive, variant: props.variant, size: props.size })
</script>

<template>
  <div class="toggle-group" :data-variant="variant" data-slot="toggle-group">
    <slot />
  </div>
</template>

<style scoped>
.toggle-group {
  display: inline-flex;
  align-items: center;
  border-radius: 6px;
}
.toggle-group[data-variant='outline'] {
  box-shadow: 0 0 0 1px rgba(255,255,255,0.1);
}
</style>
