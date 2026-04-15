<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'destructive' | 'success' | 'warning'
    title?: string
    description?: string
  }>(),
  { variant: 'default' },
)

const cls = computed(() => ['alert', `alert--${props.variant}`])
</script>

<template>
  <div :class="cls" role="alert" data-slot="alert">
    <div v-if="$slots.icon" class="alert__icon">
      <slot name="icon" />
    </div>
    <div class="alert__body">
      <div v-if="title || $slots.title" class="alert__title" data-slot="alert-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="description || $slots.description" class="alert__desc" data-slot="alert-description">
        <slot name="description">{{ description }}</slot>
      </div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.alert {
  display: flex;
  gap: 12px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid;
  padding: 14px 16px;
  font-size: 0.875rem;
  align-items: flex-start;
}
.alert__icon { flex-shrink: 0; margin-top: 1px; }
.alert__body { display: flex; flex-direction: column; gap: 4px; flex: 1; }
.alert__title { font-weight: 600; line-height: 1.2; }
.alert__desc { color: inherit; opacity: 0.8; }

.alert--default { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.12); color: #fff; }
.alert--destructive { background: rgba(232,93,74,0.1); border-color: rgba(232,93,74,0.3); color: #e85d4a; }
.alert--success { background: rgba(74,197,123,0.1); border-color: rgba(74,197,123,0.3); color: #4ac57b; }
.alert--warning { background: rgba(250,176,5,0.1); border-color: rgba(250,176,5,0.3); color: #fab005; }
</style>
