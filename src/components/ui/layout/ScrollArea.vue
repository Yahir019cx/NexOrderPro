<script setup lang="ts">
withDefaults(
  defineProps<{
    maxHeight?: string
    maxWidth?: string
  }>(),
  {},
)
</script>

<template>
  <div
    class="scroll-area"
    :style="{ maxHeight, maxWidth }"
    data-slot="scroll-area"
  >
    <slot />
  </div>
</template>

<style scoped>
.scroll-area {
  overflow: auto;
  position: relative;
}
.scroll-area::-webkit-scrollbar { width: 6px; height: 6px; }
.scroll-area::-webkit-scrollbar-track { background: transparent; }
.scroll-area::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.15);
  border-radius: 99px;
}
.scroll-area::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }
</style>
