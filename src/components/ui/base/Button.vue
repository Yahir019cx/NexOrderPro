<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  { variant: 'default', size: 'default', type: 'button' },
)

const cls = computed(() => ['btn', `btn--${props.variant}`, `btn--${props.size}`])
</script>

<template>
  <button :type="type" :disabled="disabled" :class="cls" data-slot="button">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s, opacity 0.2s, color 0.2s;
  font-family: inherit;
}
.btn:disabled { pointer-events: none; opacity: 0.5; }

/* Variants */
.btn--default { background: #a38162; color: #fff; }
.btn--default:hover { background: #8d6e52; }

.btn--destructive { background: #e85d4a; color: #fff; }
.btn--destructive:hover { opacity: 0.9; }

.btn--outline { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: inherit; }
.btn--outline:hover { background: rgba(255,255,255,0.05); }

.btn--secondary { background: rgba(255,255,255,0.1); color: inherit; }
.btn--secondary:hover { background: rgba(255,255,255,0.15); }

.btn--ghost { background: transparent; color: inherit; }
.btn--ghost:hover { background: rgba(255,255,255,0.06); }

.btn--link { background: none; color: #a38162; text-decoration: underline; text-underline-offset: 4px; padding: 0; }

/* Sizes */
.btn--default { height: 36px; padding: 0 16px; }
.btn--sm { height: 32px; padding: 0 12px; font-size: 0.8125rem; }
.btn--lg { height: 40px; padding: 0 24px; }
.btn--icon { width: 36px; height: 36px; padding: 0; }
</style>
