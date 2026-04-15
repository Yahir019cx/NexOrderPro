<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    variant?: 'default' | 'outline'
    size?: 'default' | 'sm' | 'lg'
    disabled?: boolean
  }>(),
  { variant: 'default', size: 'default' },
)

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const cls = computed(() => [
  'toggle',
  `toggle--${props.variant}`,
  `toggle--${props.size}`,
  { 'toggle--on': props.modelValue },
])
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-pressed="modelValue"
    :disabled="disabled"
    :class="cls"
    data-slot="toggle"
    @click="emit('update:modelValue', !modelValue)"
  >
    <slot />
  </button>
</template>

<style scoped>
.toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: rgba(255,255,255,0.6);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  outline: none;
  font-family: inherit;
  white-space: nowrap;
}
.toggle:hover:not(:disabled) { background: rgba(255,255,255,0.06); color: #fff; }
.toggle--on { background: rgba(163,129,98,0.15); color: #a38162; }
.toggle--outline { border: 1px solid rgba(255,255,255,0.12); }
.toggle--outline.toggle--on { border-color: rgba(163,129,98,0.4); }
.toggle:disabled { opacity: 0.5; cursor: not-allowed; }

.toggle--default { height: 36px; padding: 0 8px; min-width: 36px; }
.toggle--sm { height: 32px; padding: 0 6px; min-width: 32px; }
.toggle--lg { height: 40px; padding: 0 10px; min-width: 40px; }
</style>
