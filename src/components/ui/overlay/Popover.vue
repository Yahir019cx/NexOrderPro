<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

withDefaults(
  defineProps<{
    align?: 'start' | 'center' | 'end'
    side?: 'top' | 'bottom' | 'left' | 'right'
  }>(),
  { align: 'center', side: 'bottom' },
)

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

function handleOutsideClick(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleOutsideClick))
onUnmounted(() => document.removeEventListener('mousedown', handleOutsideClick))
</script>

<template>
  <div ref="containerRef" class="popover-wrap" data-slot="popover">
    <div @click="isOpen = !isOpen">
      <slot name="trigger" />
    </div>
    <Transition name="popover">
      <div v-if="isOpen" :class="['popover-content', `popover--${side}`, `popover-align--${align}`]" data-slot="popover-content">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.popover-wrap { position: relative; display: inline-flex; }
.popover-content {
  position: absolute;
  z-index: 50;
  min-width: 200px;
  background: #1e1e1e;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}
.popover--bottom { top: calc(100% + 8px); }
.popover--top { bottom: calc(100% + 8px); }
.popover--left { right: calc(100% + 8px); top: 0; }
.popover--right { left: calc(100% + 8px); top: 0; }
.popover-align--start { left: 0; }
.popover-align--center { left: 50%; transform: translateX(-50%); }
.popover-align--end { right: 0; }

.popover-enter-active, .popover-leave-active { transition: opacity 0.15s, transform 0.15s; }
.popover-enter-from, .popover-leave-to { opacity: 0; transform: scale(0.95); }
</style>
