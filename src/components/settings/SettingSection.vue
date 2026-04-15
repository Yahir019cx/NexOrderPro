<script setup lang="ts">
import { useSlots } from 'vue'

const props = defineProps<{
  title: string
  description?: string
}>()

const slots = useSlots()
</script>

<template>
  <div
    class="bg-card rounded-xl p-6 border border-border"
    :style="{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }"
  >
    <div class="mb-5">
      <h3
        class="text-foreground mb-1"
        style="font-size: 1.125rem; font-weight: 600"
      >
        {{ title }}
      </h3>
      <p
        v-if="description"
        class="text-muted-foreground"
        style="font-size: 0.875rem"
      >
        {{ description }}
      </p>
    </div>

    <slot />
  </div>
</template>
