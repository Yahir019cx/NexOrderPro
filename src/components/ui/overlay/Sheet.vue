<script setup lang="ts">
import { X } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    open?: boolean
    side?: 'left' | 'right' | 'top' | 'bottom'
    title?: string
  }>(),
  { side: 'right' },
)

const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet-overlay">
      <div v-if="open" class="sheet-overlay" @click.self="emit('close')" />
    </Transition>
    <Transition :name="`sheet-${side}`">
      <div v-if="open" :class="['sheet', `sheet--${side}`]" role="dialog" aria-modal="true" data-slot="sheet">
        <div class="sheet-header">
          <h2 v-if="title" class="sheet-title">{{ title }}</h2>
          <slot name="header" />
          <button class="sheet-close" aria-label="Cerrar" @click="emit('close')">
            <X :size="16" />
          </button>
        </div>
        <div class="sheet-body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="sheet-footer">
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sheet-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0,0,0,0.5);
}
.sheet {
  position: fixed;
  z-index: 101;
  background: #1e1e1e;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 16px 64px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
}
.sheet--right { top: 0; right: 0; height: 100vh; width: 400px; max-width: 90vw; border-radius: 16px 0 0 16px; }
.sheet--left { top: 0; left: 0; height: 100vh; width: 400px; max-width: 90vw; border-radius: 0 16px 16px 0; }
.sheet--top { top: 0; left: 0; right: 0; max-height: 50vh; border-radius: 0 0 16px 16px; }
.sheet--bottom { bottom: 0; left: 0; right: 0; max-height: 50vh; border-radius: 16px 16px 0 0; }
.sheet-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  flex-shrink: 0;
}
.sheet-title { font-size: 1.125rem; font-weight: 600; color: #fff; }
.sheet-body { flex: 1; overflow-y: auto; padding: 24px; }
.sheet-footer { padding: 16px 24px; border-top: 1px solid rgba(255,255,255,0.08); flex-shrink: 0; }
.sheet-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  flex-shrink: 0;
  outline: none;
  transition: background 0.2s;
}
.sheet-close:hover { background: rgba(255,255,255,0.08); color: #fff; }

/* Transitions */
.sheet-overlay-enter-active, .sheet-overlay-leave-active { transition: opacity 0.25s; }
.sheet-overlay-enter-from, .sheet-overlay-leave-to { opacity: 0; }

.sheet-right-enter-active, .sheet-right-leave-active { transition: transform 0.25s ease; }
.sheet-right-enter-from, .sheet-right-leave-to { transform: translateX(100%); }

.sheet-left-enter-active, .sheet-left-leave-active { transition: transform 0.25s ease; }
.sheet-left-enter-from, .sheet-left-leave-to { transform: translateX(-100%); }

.sheet-bottom-enter-active, .sheet-bottom-leave-active { transition: transform 0.25s ease; }
.sheet-bottom-enter-from, .sheet-bottom-leave-to { transform: translateY(100%); }

.sheet-top-enter-active, .sheet-top-leave-active { transition: transform 0.25s ease; }
.sheet-top-enter-from, .sheet-top-leave-to { transform: translateY(-100%); }
</style>
