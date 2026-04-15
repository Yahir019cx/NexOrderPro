<script setup>
import { computed } from 'vue'

const props = defineProps({
  available: Number,
  occupied: Number,
  billRequested: Number
})

const total = computed(() => props.available + props.occupied + props.billRequested)
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
    <!-- Total -->
    <div class="bg-card rounded-xl p-5 border border-border">
      <div class="text-muted-foreground mb-1" style="font-size: 0.875rem;">
        Total de Mesas
      </div>
      <div class="text-foreground" style="font-size: 2rem; font-weight: 700; line-height: 1;">
        {{ total }}
      </div>
    </div>

    <!-- Available -->
    <div
      class="rounded-xl p-5 border"
      :style="{
        backgroundColor: 'var(--status-available-bg)',
        borderColor: 'var(--status-available)'
      }"
    >
      <div
        class="mb-1 flex items-center gap-2"
        :style="{ fontSize: '0.875rem', color: 'var(--status-available-text)' }"
      >
        <div
          class="w-2 h-2 rounded-full"
          :style="{ backgroundColor: 'var(--status-available)' }"
        />
        Disponibles
      </div>
      <div
        :style="{ fontSize: '2rem', fontWeight: 700, lineHeight: 1, color: 'var(--status-available-text)' }"
      >
        {{ available }}
      </div>
    </div>

    <!-- Occupied -->
    <div
      class="rounded-xl p-5 border"
      :style="{
        backgroundColor: 'var(--status-occupied-bg)',
        borderColor: 'var(--status-occupied)'
      }"
    >
      <div
        class="mb-1 flex items-center gap-2"
        :style="{ fontSize: '0.875rem', color: 'var(--status-occupied-text)' }"
      >
        <div
          class="w-2 h-2 rounded-full"
          :style="{ backgroundColor: 'var(--status-occupied)' }"
        />
        Ocupadas
      </div>
      <div
        :style="{ fontSize: '2rem', fontWeight: 700, lineHeight: 1, color: 'var(--status-occupied-text)' }"
      >
        {{ occupied }}
      </div>
    </div>

    <!-- Bill Requested -->
    <div
      class="rounded-xl p-5 border"
      :style="{
        backgroundColor: 'var(--status-requested-bg)',
        borderColor: 'var(--status-requested)'
      }"
    >
      <div
        class="mb-1 flex items-center gap-2"
        :style="{ fontSize: '0.875rem', color: 'var(--status-requested-text)' }"
      >
        <div
          class="w-2 h-2 rounded-full"
          :style="{ backgroundColor: 'var(--status-requested)' }"
        />
        Cuenta Pedida
      </div>
      <div
        :style="{ fontSize: '2rem', fontWeight: 700, lineHeight: 1, color: 'var(--status-requested-text)' }"
      >
        {{ billRequested }}
      </div>
    </div>
  </div>
</template>
