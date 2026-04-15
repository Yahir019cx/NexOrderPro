<script setup lang="ts">
import { Receipt } from 'lucide-vue-next'

const props = defineProps<{
  tableName: string
  total: number
  date: string
  time: string
  onClick?: () => void
}>()
</script>

<template>
  <button
    @click="onClick"
    class="w-full bg-card rounded-lg p-5 border border-border hover:border-[var(--brand)] transition-all duration-200 text-left"
    :style="{
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
    }"
  >
    <div class="flex items-start justify-between gap-4 mb-3">
      <!-- Table Info -->
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          :style="{ backgroundColor: 'var(--brand-light)' }"
        >
          <Receipt class="w-5 h-5" :style="{ color: 'var(--brand)' }" />
        </div>
        <div>
          <h3
            class="text-foreground"
            style="font-size: 1rem; font-weight: 600"
          >
            {{ tableName }}
          </h3>
          <div
            class="inline-flex items-center px-2 py-0.5 rounded-md mt-1"
            :style="{
              backgroundColor: 'var(--status-available-bg)',
              color: 'var(--status-available-text)',
              fontSize: '0.75rem',
              fontWeight: 600
            }"
          >
            Cerrada
          </div>
        </div>
      </div>

      <!-- Total -->
      <div class="text-right">
        <div
          class="text-foreground"
          :style="{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--brand)'
          }"
        >
          ${{ total.toFixed(2) }}
        </div>
      </div>
    </div>

    <!-- Date & Time -->
    <div class="flex items-center gap-4 text-muted-foreground pt-3 border-t border-border">
      <span style="font-size: 0.875rem">{{ date }}</span>
      <span style="font-size: 0.875rem">•</span>
      <span style="font-size: 0.875rem">{{ time }}</span>
    </div>
  </button>
</template>
