<script setup lang="ts">
import { inject, computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const props = defineProps<{ value: string; title?: string }>()

const accordion = inject<{
  opened: { value: string[] }
  toggle(v: string): void
}>('accordion')

const isOpen = computed(() => accordion?.opened.value.includes(props.value) ?? false)
</script>

<template>
  <div class="accordion-item" :class="{ 'accordion-item--open': isOpen }" data-slot="accordion-item">
    <button
      type="button"
      class="accordion-trigger"
      :aria-expanded="isOpen"
      data-slot="accordion-trigger"
      @click="accordion?.toggle(value)"
    >
      <slot name="trigger">{{ title }}</slot>
      <ChevronDown
        :size="16"
        class="accordion-icon"
        :class="{ 'accordion-icon--open': isOpen }"
      />
    </button>
    <div v-if="isOpen" class="accordion-content" data-slot="accordion-content">
      <div class="accordion-content-inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion-item {
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.accordion-item:last-child { border-bottom: none; }
.accordion-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 16px 0;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  outline: none;
  transition: opacity 0.2s;
}
.accordion-trigger:hover { opacity: 0.8; }
.accordion-icon {
  flex-shrink: 0;
  color: rgba(255,255,255,0.4);
  transition: transform 0.2s;
}
.accordion-icon--open { transform: rotate(180deg); }
.accordion-content { overflow: hidden; }
.accordion-content-inner { padding-bottom: 16px; font-size: 0.875rem; color: rgba(255,255,255,0.7); }
</style>
