<script setup lang="ts">
import { inject, computed } from 'vue'

const props = defineProps<{ value: string; disabled?: boolean }>()

const tabs = inject<{ active: { value: string }; select(v: string): void }>('tabs')

const isActive = computed(() => tabs?.active.value === props.value)

function handleClick() {
  if (!props.disabled) tabs?.select(props.value)
}
</script>

<template>
  <button
    type="button"
    role="tab"
    :aria-selected="isActive"
    :disabled="disabled"
    :class="['tabs-trigger', { 'tabs-trigger--active': isActive }]"
    data-slot="tabs-trigger"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style scoped>
.tabs-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0 10px;
  height: 100%;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255,255,255,0.5);
  background: transparent;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.2s, background 0.2s;
  outline: none;
  font-family: inherit;
}
.tabs-trigger:hover:not(:disabled) { color: #fff; }
.tabs-trigger--active {
  background: #1e1e1e;
  color: #fff;
  border-color: rgba(255,255,255,0.1);
}
.tabs-trigger:disabled { pointer-events: none; opacity: 0.5; }
</style>
