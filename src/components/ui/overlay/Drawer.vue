<script setup lang="ts">
import { X } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    open?: boolean
    title?: string
    side?: 'bottom' | 'top'
  }>(),
  { side: 'bottom' },
)

const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <Teleport to="body">
    <Transition name="overlay-fade">
      <div v-if="open" class="drawer-overlay" @click.self="emit('close')" />
    </Transition>
    <Transition :name="`drawer-${side}`">
      <div v-if="open" :class="['drawer', `drawer--${side}`]" role="dialog" aria-modal="true" data-slot="drawer">
        <div class="drawer-handle" />
        <div v-if="title || $slots.header" class="drawer-header">
          <h2 v-if="title" class="drawer-title">{{ title }}</h2>
          <slot name="header" />
          <button class="drawer-close" @click="emit('close')">
            <X :size="16" />
          </button>
        </div>
        <div class="drawer-body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="drawer-footer">
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0,0,0,0.5);
}
.drawer {
  position: fixed;
  z-index: 101;
  left: 0;
  right: 0;
  background: #1e1e1e;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 -16px 64px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  border-radius: 16px 16px 0 0;
}
.drawer--bottom { bottom: 0; top: auto; }
.drawer--top { top: 0; bottom: auto; border-radius: 0 0 16px 16px; }
.drawer-handle {
  width: 40px;
  height: 4px;
  border-radius: 99px;
  background: rgba(255,255,255,0.2);
  margin: 12px auto 0;
  flex-shrink: 0;
}
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  flex-shrink: 0;
}
.drawer-title { font-size: 1.125rem; font-weight: 600; color: #fff; }
.drawer-body { flex: 1; overflow-y: auto; padding: 20px 24px; }
.drawer-footer { padding: 16px 24px; border-top: 1px solid rgba(255,255,255,0.08); }
.drawer-close {
  display: flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; border-radius: 6px;
  border: none; background: transparent;
  color: rgba(255,255,255,0.5); cursor: pointer; outline: none;
}
.drawer-close:hover { background: rgba(255,255,255,0.08); color: #fff; }

.overlay-fade-enter-active, .overlay-fade-leave-active { transition: opacity 0.25s; }
.overlay-fade-enter-from, .overlay-fade-leave-to { opacity: 0; }
.drawer-bottom-enter-active, .drawer-bottom-leave-active { transition: transform 0.25s ease; }
.drawer-bottom-enter-from, .drawer-bottom-leave-to { transform: translateY(100%); }
.drawer-top-enter-active, .drawer-top-leave-active { transition: transform 0.25s ease; }
.drawer-top-enter-from, .drawer-top-leave-to { transform: translateY(-100%); }
</style>
