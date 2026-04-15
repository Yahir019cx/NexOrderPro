<script setup lang="ts">
import { Check } from 'lucide-vue-next'

const props = defineProps<{
  modelValue?: boolean
  disabled?: boolean
  id?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

function toggle() {
  if (!props.disabled) emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <button
    :id="id"
    type="button"
    role="checkbox"
    :aria-checked="modelValue"
    :disabled="disabled"
    :class="['checkbox', { 'checkbox--checked': modelValue }]"
    data-slot="checkbox"
    @click="toggle"
  >
    <Check v-if="modelValue" :size="12" :stroke-width="3" class="checkbox__icon" />
  </button>
</template>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.04);
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s, border-color 0.2s;
  outline: none;
}
.checkbox:focus-visible {
  box-shadow: 0 0 0 3px rgba(163,129,98,0.3);
}
.checkbox--checked {
  background: #a38162;
  border-color: #a38162;
}
.checkbox:disabled { cursor: not-allowed; opacity: 0.5; }
.checkbox__icon { color: #fff; }
</style>
