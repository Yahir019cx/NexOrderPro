<script setup lang="ts">
import { provide, inject } from 'vue'

const props = defineProps<{
  modelValue?: string
  disabled?: boolean
  options?: { value: string; label: string }[]
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

provide('radioGroup', {
  modelValue: () => props.modelValue,
  disabled: () => props.disabled,
  select: (val: string) => emit('update:modelValue', val),
})
</script>

<template>
  <div class="radio-group" role="radiogroup" data-slot="radio-group">
    <template v-if="options">
      <label
        v-for="opt in options"
        :key="opt.value"
        class="radio-item"
      >
        <button
          type="button"
          role="radio"
          :aria-checked="modelValue === opt.value"
          :disabled="disabled"
          :class="['radio-btn', { 'radio-btn--checked': modelValue === opt.value }]"
          @click="emit('update:modelValue', opt.value)"
        >
          <span v-if="modelValue === opt.value" class="radio-dot" />
        </button>
        <span class="radio-label">{{ opt.label }}</span>
      </label>
    </template>
    <slot v-else />
  </div>
</template>

<style scoped>
.radio-group { display: grid; gap: 10px; }
.radio-item { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.radio-btn {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;
}
.radio-btn--checked { border-color: #a38162; }
.radio-btn:focus-visible { box-shadow: 0 0 0 3px rgba(163,129,98,0.3); }
.radio-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #a38162;
}
.radio-label { font-size: 0.875rem; color: inherit; }
</style>
