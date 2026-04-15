<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  }>(),
  { variant: 'default' },
)

const cls = computed(() => ['badge', `badge--${props.variant}`])
</script>

<template>
  <span :class="cls" data-slot="badge">
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid transparent;
  padding: 2px 8px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  gap: 4px;
  overflow: hidden;
}

.badge--default { background: #a38162; color: #fff; border-color: transparent; }
.badge--secondary { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.85); }
.badge--destructive { background: #e85d4a; color: #fff; }
.badge--outline { background: transparent; border-color: rgba(255,255,255,0.2); color: inherit; }
</style>
