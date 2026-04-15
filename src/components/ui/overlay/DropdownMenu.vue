<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

withDefaults(
  defineProps<{
    align?: 'start' | 'end' | 'center'
    items?: {
      label: string
      icon?: unknown
      shortcut?: string
      disabled?: boolean
      destructive?: boolean
      separator?: boolean
      action?: () => void
    }[]
  }>(),
  { align: 'end' },
)

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

function handleOutsideClick(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

function runAction(action?: () => void) {
  action?.()
  isOpen.value = false
}

onMounted(() => document.addEventListener('mousedown', handleOutsideClick))
onUnmounted(() => document.removeEventListener('mousedown', handleOutsideClick))
</script>

<template>
  <div ref="containerRef" class="dropdown-wrap" data-slot="dropdown-menu">
    <div @click="isOpen = !isOpen">
      <slot name="trigger" />
    </div>
    <Transition name="dropdown">
      <div v-if="isOpen" :class="['dropdown-content', `dropdown-align--${align}`]" role="menu">
        <template v-if="items">
          <template v-for="(item, i) in items" :key="i">
            <div v-if="item.separator" class="dropdown-separator" />
            <button
              v-else
              type="button"
              role="menuitem"
              :disabled="item.disabled"
              :class="['dropdown-item', { 'dropdown-item--destructive': item.destructive }]"
              @click="runAction(item.action)"
            >
              <component :is="item.icon" v-if="item.icon" class="dropdown-item-icon" />
              <span>{{ item.label }}</span>
              <span v-if="item.shortcut" class="dropdown-item-shortcut">{{ item.shortcut }}</span>
            </button>
          </template>
        </template>
        <slot v-else />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-wrap { position: relative; display: inline-flex; }
.dropdown-content {
  position: absolute;
  top: calc(100% + 4px);
  z-index: 50;
  min-width: 180px;
  background: #1e1e1e;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 4px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  overflow: hidden;
}
.dropdown-align--end { right: 0; }
.dropdown-align--start { left: 0; }
.dropdown-align--center { left: 50%; transform: translateX(-50%); }
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: rgba(255,255,255,0.85);
  font-size: 0.875rem;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  transition: background 0.15s;
  outline: none;
}
.dropdown-item:hover:not(:disabled) { background: rgba(255,255,255,0.07); }
.dropdown-item:disabled { opacity: 0.5; cursor: not-allowed; }
.dropdown-item--destructive { color: #e85d4a; }
.dropdown-item--destructive:hover:not(:disabled) { background: rgba(232,93,74,0.1); }
.dropdown-item-icon { width: 16px; height: 16px; flex-shrink: 0; }
.dropdown-item-shortcut { margin-left: auto; font-size: 0.75rem; color: rgba(255,255,255,0.35); }
.dropdown-separator { height: 1px; background: rgba(255,255,255,0.08); margin: 4px 0; }

.dropdown-enter-active, .dropdown-leave-active { transition: opacity 0.15s, transform 0.15s; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: scale(0.95) translateY(-4px); }
</style>
