<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    value?: number
    max?: number
  }>(),
  { value: 0, max: 100 },
)

const percentage = computed(() => Math.min(100, Math.max(0, (props.value / props.max) * 100)))
</script>

<template>
  <div
    class="progress"
    role="progressbar"
    :aria-valuenow="value"
    :aria-valuemin="0"
    :aria-valuemax="max"
    data-slot="progress"
  >
    <div class="progress__bar" :style="{ width: `${percentage}%` }" data-slot="progress-indicator" />
  </div>
</template>

<style scoped>
.progress {
  position: relative;
  width: 100%;
  height: 8px;
  border-radius: 99px;
  background: rgba(255,255,255,0.1);
  overflow: hidden;
}
.progress__bar {
  height: 100%;
  background: #a38162;
  border-radius: 99px;
  transition: width 0.4s ease;
}
</style>
