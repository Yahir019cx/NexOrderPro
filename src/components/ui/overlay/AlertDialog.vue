<script setup lang="ts">
defineProps<{
  open?: boolean
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'default' | 'destructive'
}>()

const emit = defineEmits<{ confirm: []; cancel: [] }>()
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="open" class="alert-overlay" role="alertdialog" aria-modal="true">
        <div class="alert-content">
          <div class="alert-header">
            <slot name="header">
              <h2 class="alert-title">{{ title }}</h2>
              <p v-if="description" class="alert-description">{{ description }}</p>
            </slot>
          </div>

          <div class="alert-body">
            <slot />
          </div>

          <div class="alert-footer">
            <slot name="footer">
              <button class="alert-btn alert-btn--cancel" @click="emit('cancel')">
                {{ cancelLabel ?? 'Cancelar' }}
              </button>
              <button
                :class="['alert-btn', variant === 'destructive' ? 'alert-btn--destructive' : 'alert-btn--confirm']"
                @click="emit('confirm')"
              >
                {{ confirmLabel ?? 'Confirmar' }}
              </button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.alert-overlay {
  position: fixed;
  inset: 0;
  z-index: 110;
  background: rgba(0,0,0,0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.alert-content {
  background: #1e1e1e;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  width: 100%;
  max-width: 28rem;
  box-shadow: 0 24px 64px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  gap: 0;
}
.alert-header { padding: 24px 24px 0; display: flex; flex-direction: column; gap: 6px; }
.alert-title { font-size: 1.125rem; font-weight: 600; color: #fff; }
.alert-description { font-size: 0.875rem; color: rgba(255,255,255,0.5); }
.alert-body { padding: 16px 24px; }
.alert-footer { display: flex; justify-content: flex-end; gap: 8px; padding: 0 24px 24px; }
.alert-btn {
  height: 36px;
  padding: 0 16px;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition: opacity 0.2s;
}
.alert-btn--cancel { background: rgba(255,255,255,0.08); color: #fff; }
.alert-btn--cancel:hover { background: rgba(255,255,255,0.12); }
.alert-btn--confirm { background: #a38162; color: #fff; }
.alert-btn--confirm:hover { opacity: 0.9; }
.alert-btn--destructive { background: #e85d4a; color: #fff; }
.alert-btn--destructive:hover { opacity: 0.9; }

.dialog-enter-active, .dialog-leave-active { transition: opacity 0.2s; }
.dialog-enter-from, .dialog-leave-to { opacity: 0; }
</style>
