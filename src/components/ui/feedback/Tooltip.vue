<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
  defineProps<{
    content?: string
    side?: 'top' | 'bottom' | 'left' | 'right'
    delayMs?: number
  }>(),
  { side: 'top', delayMs: 400 },
)

const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

function show(delayMs: number) {
  timer = setTimeout(() => { visible.value = true }, delayMs)
}
function hide() {
  if (timer) clearTimeout(timer)
  visible.value = false
}
</script>

<template>
  <div
    class="tooltip-wrap"
    data-slot="tooltip"
    @mouseenter="show(delayMs)"
    @mouseleave="hide"
    @focusin="show(0)"
    @focusout="hide"
  >
    <slot />
    <Transition name="tooltip">
      <div v-if="visible && content" :class="['tooltip-content', `tooltip--${side}`]" role="tooltip" data-slot="tooltip-content">
        {{ content }}
        <div class="tooltip-arrow" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.tooltip-wrap { position: relative; display: inline-flex; }
.tooltip-content {
  position: absolute;
  z-index: 60;
  padding: 6px 10px;
  border-radius: 6px;
  background: #111;
  border: 1px solid rgba(255,255,255,0.1);
  color: #fff;
  font-size: 0.75rem;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
.tooltip--top { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.tooltip--bottom { top: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.tooltip--left { right: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
.tooltip--right { left: calc(100% + 8px); top: 50%; transform: translateY(-50%); }

.tooltip-enter-active, .tooltip-leave-active { transition: opacity 0.15s, transform 0.15s; }
.tooltip-enter-from, .tooltip-leave-to { opacity: 0; transform: translateX(-50%) scale(0.9); }
</style>
