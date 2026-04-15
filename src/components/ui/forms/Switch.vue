<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

function toggle() {
  if (!props.disabled) emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :disabled="disabled"
    :class="['switch', { 'switch--on': modelValue }]"
    data-slot="switch"
    @click="toggle"
  >
    <span class="switch__thumb" />
  </button>
</template>

<style scoped>
.switch {
  display: inline-flex;
  align-items: center;
  width: 36px;
  height: 20px;
  border-radius: 99px;
  border: 1px solid transparent;
  background: rgba(255,255,255,0.15);
  cursor: pointer;
  transition: background 0.2s;
  outline: none;
  flex-shrink: 0;
  padding: 0 2px;
}
.switch:focus-visible { box-shadow: 0 0 0 3px rgba(163,129,98,0.3); }
.switch:disabled { cursor: not-allowed; opacity: 0.5; }
.switch--on { background: #a38162; }

.switch__thumb {
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.2s;
  transform: translateX(0);
  flex-shrink: 0;
}
.switch--on .switch__thumb { transform: translateX(16px); }
</style>
