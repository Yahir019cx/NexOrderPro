<script setup lang="ts">
defineProps<{
  type?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  modelValue?: string | number
}>()

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <input
    v-bind="$attrs"
    :type="type ?? 'text'"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :value="modelValue"
    class="ui-input"
    data-slot="input"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<style scoped>
.ui-input {
  display: flex;
  height: 36px;
  width: 100%;
  min-width: 0;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.04);
  padding: 0 12px;
  font-size: 0.875rem;
  color: #fff;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.ui-input::placeholder { color: rgba(255,255,255,0.35); }
.ui-input:focus {
  border-color: #a38162;
  box-shadow: 0 0 0 3px rgba(163,129,98,0.2);
}
.ui-input:disabled { pointer-events: none; cursor: not-allowed; opacity: 0.5; }
</style>
