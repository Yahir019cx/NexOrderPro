<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'

defineProps<{
  modelValue?: string | number
  placeholder?: string
  disabled?: boolean
  options?: { value: string | number; label: string }[]
}>()

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="select-wrap" data-slot="select">
    <select
      class="select"
      :value="modelValue"
      :disabled="disabled"
      data-slot="select-trigger"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-if="placeholder" value="" disabled :selected="!modelValue">
        {{ placeholder }}
      </option>
      <option
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
        :selected="opt.value === modelValue"
      >
        {{ opt.label }}
      </option>
      <slot />
    </select>
    <ChevronDown :size="16" class="select-icon" />
  </div>
</template>

<style scoped>
.select-wrap {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}
.select {
  appearance: none;
  width: 100%;
  height: 36px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.04);
  padding: 0 36px 0 12px;
  font-size: 0.875rem;
  color: #fff;
  font-family: inherit;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.select:focus {
  border-color: #a38162;
  box-shadow: 0 0 0 3px rgba(163,129,98,0.2);
}
.select:disabled { cursor: not-allowed; opacity: 0.5; }
.select option { background: #1e1e1e; color: #fff; }
.select-icon {
  position: absolute;
  right: 10px;
  pointer-events: none;
  color: rgba(255,255,255,0.4);
}
</style>
