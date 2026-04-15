<script setup lang="ts">
defineProps<{
  label: string
  description?: string
  checked: boolean
}>()

defineEmits<{ change: [value: boolean] }>()
</script>

<template>
  <div class="setting-toggle">
    <div class="setting-toggle__text">
      <span class="setting-toggle__label">{{ label }}</span>
      <span v-if="description" class="setting-toggle__desc">{{ description }}</span>
    </div>

    <button
      type="button"
      role="switch"
      :aria-checked="checked"
      :class="['switch', { 'switch--on': checked }]"
      @click="$emit('change', !checked)"
    >
      <span class="switch__thumb" />
    </button>
  </div>
</template>

<style scoped>
.setting-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
}
.setting-toggle__text { display: flex; flex-direction: column; gap: 2px; }
.setting-toggle__label { font-size: 0.9375rem; font-weight: 500; color: #fff; }
.setting-toggle__desc { font-size: 0.8125rem; color: rgba(255,255,255,0.5); }

.switch {
  display: inline-flex;
  align-items: center;
  width: 40px;
  height: 22px;
  border-radius: 99px;
  border: none;
  background: rgba(255,255,255,0.15);
  cursor: pointer;
  transition: background 0.2s;
  outline: none;
  flex-shrink: 0;
  padding: 0 2px;
}
.switch--on { background: #a38162; }
.switch__thumb {
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.2s;
}
.switch--on .switch__thumb { transform: translateX(18px); }
</style>
