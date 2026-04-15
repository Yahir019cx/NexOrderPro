<script setup>
import { computed } from 'vue'
import { Users } from 'lucide-vue-next'

const props = defineProps({
  name: String,
  status: String,
  peopleCount: Number,
  onClick: Function
})

const statusConfig = {
  disponible: {
    label: 'Disponible',
    bgColor: 'var(--status-available-bg)',
    textColor: 'var(--status-available-text)'
  },
  ocupada: {
    label: 'Ocupada',
    bgColor: 'var(--status-occupied-bg)',
    textColor: 'var(--status-occupied-text)'
  },
  'cuenta-pedida': {
    label: 'Cuenta pedida',
    bgColor: 'var(--status-requested-bg)',
    textColor: 'var(--status-requested-text)'
  }
}

const config = computed(() => statusConfig[props.status])
</script>

<template>
  <button
    @click="onClick"
    class="
      relative w-full bg-card rounded-xl p-6
      border border-border
      transition-all duration-200
      hover:border-[var(--brand)]
      text-left group h-32
      flex flex-col justify-between
    "
    :style="{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }"
  >
    <!-- Status Chip -->
    <div class="absolute top-3.5 right-3.5">
      <div
        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md"
        :style="{
          backgroundColor: config.bgColor,
          color: config.textColor
        }"
      >
        <div
          class="w-1 h-1 rounded-full"
          :style="{ backgroundColor: config.textColor }"
        />
        <span style="font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.01em;">
          {{ config.label }}
        </span>
      </div>
    </div>

    <!-- Table Name -->
    <h3
      class="text-foreground pr-24"
      style="font-size: 1.5rem; font-weight: 600; letter-spacing: -0.01em;"
    >
      {{ name }}
    </h3>

    <!-- People Count -->
    <div
      v-if="peopleCount !== undefined"
      class="flex items-center gap-2 text-muted-foreground"
    >
      <Users class="w-4 h-4" />
      <span style="font-size: 0.875rem;">
        {{ peopleCount }} {{ peopleCount === 1 ? 'persona' : 'personas' }}
      </span>
    </div>
  </button>
</template>
