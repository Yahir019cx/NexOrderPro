<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<template>
  <div class="skeleton" data-slot="skeleton">
    <slot />
  </div>
</template>

<style scoped>
.skeleton {
  background: rgba(255,255,255,0.07);
  border-radius: 6px;
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>
