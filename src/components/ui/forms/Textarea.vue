<script setup lang="ts">
defineProps<{
  placeholder?: string
  disabled?: boolean
  required?: boolean
  rows?: number
  modelValue?: string
}>()

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <textarea
    v-bind="$attrs"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :rows="rows ?? 3"
    :value="modelValue"
    class="ui-textarea"
    data-slot="textarea"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>

<style scoped>
.ui-textarea {
  display: flex;
  width: 100%;
  min-height: 64px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.04);
  padding: 8px 12px;
  font-size: 0.875rem;
  color: #fff;
  font-family: inherit;
  outline: none;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.ui-textarea::placeholder { color: rgba(255,255,255,0.35); }
.ui-textarea:focus {
  border-color: #a38162;
  box-shadow: 0 0 0 3px rgba(163,129,98,0.2);
}
.ui-textarea:disabled { pointer-events: none; cursor: not-allowed; opacity: 0.5; }
</style>
