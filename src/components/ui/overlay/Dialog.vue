<script setup lang="ts">
import { X } from 'lucide-vue-next'

const props = defineProps<{
  open?: boolean
  title?: string
  description?: string
  hideClose?: boolean
}>()

const emit = defineEmits<{ close: [] }>()

function onOverlayClick(e: MouseEvent) {
  if (e.target === e.currentTarget) emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="open" class="dialog-overlay" data-slot="dialog-overlay" @click="onOverlayClick">
        <div class="dialog-content" role="dialog" aria-modal="true" data-slot="dialog-content">
          <!-- Header -->
          <div v-if="title || $slots.header" class="dialog-header" data-slot="dialog-header">
            <slot name="header">
              <h2 class="dialog-title">{{ title }}</h2>
              <p v-if="description" class="dialog-description">{{ description }}</p>
            </slot>
          </div>

          <!-- Body -->
          <div class="dialog-body">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="dialog-footer" data-slot="dialog-footer">
            <slot name="footer" />
          </div>

          <!-- Close -->
          <button v-if="!hideClose" class="dialog-close" aria-label="Cerrar" @click="emit('close')">
            <X :size="16" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.dialog-content {
  position: relative;
  background: #1e1e1e;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  width: 100%;
  max-width: 32rem;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 64px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  gap: 0;
}
.dialog-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 24px 24px 0;
}
.dialog-title { font-size: 1.125rem; font-weight: 600; color: #fff; }
.dialog-description { font-size: 0.875rem; color: rgba(255,255,255,0.5); }
.dialog-body { padding: 20px 24px; flex: 1; }
.dialog-footer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
  padding: 0 24px 24px;
}
.dialog-close {
  position: absolute;
  top: 16px;
  right: 16px;
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
  transition: background 0.2s, color 0.2s;
  outline: none;
}
.dialog-close:hover { background: rgba(255,255,255,0.08); color: #fff; }

/* Transitions */
.dialog-enter-active, .dialog-leave-active { transition: opacity 0.2s; }
.dialog-enter-from, .dialog-leave-to { opacity: 0; }
.dialog-enter-active .dialog-content, .dialog-leave-active .dialog-content { transition: transform 0.2s, opacity 0.2s; }
.dialog-enter-from .dialog-content { transform: scale(0.95); opacity: 0; }
.dialog-leave-to .dialog-content { transform: scale(0.95); opacity: 0; }
</style>
