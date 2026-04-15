<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-vue-next'

export type ToastType = 'default' | 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: number
  message: string
  type?: ToastType
  duration?: number
}

const toasts = ref<Toast[]>([])
let nextId = 0

function add(message: string, type: ToastType = 'default', duration = 4000) {
  const id = ++nextId
  toasts.value.push({ id, message, type, duration })
  if (duration > 0) {
    setTimeout(() => remove(id), duration)
  }
  return id
}

function remove(id: number) {
  toasts.value = toasts.value.filter(t => t.id !== id)
}

defineExpose({ add, remove })

const iconMap: Record<ToastType, unknown> = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertCircle,
  info: Info,
  default: null,
}
</script>

<template>
  <Teleport to="body">
    <div class="sonner-container" data-slot="sonner">
      <TransitionGroup name="toast" tag="div" class="toast-list">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="['toast', `toast--${toast.type ?? 'default'}`]"
          role="status"
        >
          <component
            :is="iconMap[toast.type ?? 'default']"
            v-if="iconMap[toast.type ?? 'default']"
            :size="16"
            class="toast__icon"
          />
          <span class="toast__msg">{{ toast.message }}</span>
          <button class="toast__close" @click="remove(toast.id)">
            <X :size="14" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.sonner-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}
.toast-list { display: flex; flex-direction: column; gap: 8px; }
.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.1);
  background: #1e1e1e;
  color: #fff;
  font-size: 0.875rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  pointer-events: all;
  min-width: 240px;
  max-width: 360px;
}
.toast--success { border-color: rgba(74,197,123,0.3); }
.toast--success .toast__icon { color: #4ac57b; }
.toast--error { border-color: rgba(232,93,74,0.3); }
.toast--error .toast__icon { color: #e85d4a; }
.toast--warning { border-color: rgba(250,176,5,0.3); }
.toast--warning .toast__icon { color: #fab005; }
.toast--info { border-color: rgba(59,130,246,0.3); }
.toast--info .toast__icon { color: #3b82f6; }
.toast__msg { flex: 1; }
.toast__close {
  display: flex; align-items: center; justify-content: center;
  width: 20px; height: 20px; border-radius: 4px;
  border: none; background: transparent;
  color: rgba(255,255,255,0.4); cursor: pointer;
  transition: color 0.2s;
}
.toast__close:hover { color: #fff; }

.toast-enter-active, .toast-leave-active { transition: opacity 0.3s, transform 0.3s; }
.toast-enter-from { opacity: 0; transform: translateX(20px); }
.toast-leave-to { opacity: 0; transform: translateX(20px); }
</style>
