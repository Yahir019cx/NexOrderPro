<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ ratio?: number }>(),
  { ratio: 16 / 9 },
)

const paddingTop = computed(() => `${(1 / props.ratio) * 100}%`)
</script>

<template>
  <div class="aspect-ratio" :style="{ paddingTop }" data-slot="aspect-ratio">
    <div class="aspect-ratio__inner">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.aspect-ratio { position: relative; width: 100%; }
.aspect-ratio__inner {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
