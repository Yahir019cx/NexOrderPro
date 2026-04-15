<script setup lang="ts">
defineProps<{ for?: string; disabled?: boolean }>()
</script>

<template>
  <label
    :for="$props.for"
    :class="['label', { 'label--disabled': disabled }]"
    data-slot="label"
  >
    <slot />
  </label>
</template>

<style scoped>
.label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
  color: inherit;
  user-select: none;
  cursor: default;
}
.label--disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
