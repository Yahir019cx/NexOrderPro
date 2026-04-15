<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    defaultOpen?: boolean
    title?: string
  }>(),
  { defaultOpen: false },
)

const isOpen = ref(props.defaultOpen)
</script>

<template>
  <div class="collapsible" data-slot="collapsible">
    <div class="collapsible-trigger" data-slot="collapsible-trigger" @click="isOpen = !isOpen">
      <slot name="trigger">
        <span>{{ title }}</span>
      </slot>
      <ChevronDown
        :size="16"
        class="collapsible-icon"
        :class="{ 'collapsible-icon--open': isOpen }"
      />
    </div>
    <Transition name="collapsible">
      <div v-if="isOpen" class="collapsible-content" data-slot="collapsible-content">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.collapsible { width: 100%; }
.collapsible-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
  padding: 8px 0;
  user-select: none;
}
.collapsible-icon {
  color: rgba(255,255,255,0.4);
  flex-shrink: 0;
  transition: transform 0.2s;
}
.collapsible-icon--open { transform: rotate(180deg); }
.collapsible-content { overflow: hidden; }

.collapsible-enter-active, .collapsible-leave-active { transition: opacity 0.2s, max-height 0.2s; max-height: 500px; }
.collapsible-enter-from, .collapsible-leave-to { opacity: 0; max-height: 0; }
</style>
