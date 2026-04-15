<script setup lang="ts">
withDefaults(
  defineProps<{ orientation?: 'horizontal' | 'vertical' }>(),
  { orientation: 'horizontal' },
)
</script>

<template>
  <div
    :class="['separator', `separator--${orientation}`]"
    role="separator"
    :aria-orientation="orientation"
    data-slot="separator"
  />
</template>

<style scoped>
.separator {
  background: rgba(255,255,255,0.1);
  flex-shrink: 0;
}
.separator--horizontal { height: 1px; width: 100%; }
.separator--vertical { width: 1px; height: 100%; }
</style>
