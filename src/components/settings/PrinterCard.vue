<script setup lang="ts">
import { Printer, Edit2, Trash2 } from 'lucide-vue-next'

const props = defineProps<{
  name: string
  type: 'Cocina' | 'Bar' | 'Caja'
  isActive: boolean
  onEdit?: () => void
  onDelete?: () => void
}>()
</script>

<template>
  <div class="flex items-center justify-between py-4 border-b border-border last:border-b-0">
    <div class="flex items-center gap-4">
      <div
        class="w-10 h-10 rounded-lg flex items-center justify-center"
        :style="{
          backgroundColor: isActive
            ? 'var(--brand-light)'
            : 'rgba(255, 255, 255, 0.05)'
        }"
      >
        <Printer
          class="w-5 h-5"
          :style="{ color: isActive ? 'var(--brand)' : '#666666' }"
        />
      </div>

      <div>
        <div
          class="text-foreground"
          style="font-size: 0.9375rem; font-weight: 600"
        >
          {{ name }}
        </div>

        <div class="flex items-center gap-2 mt-1">
          <span class="text-muted-foreground" style="font-size: 0.875rem">
            {{ type }}
          </span>
          <span class="text-muted-foreground">•</span>

          <div
            class="inline-flex items-center px-2 py-0.5 rounded-md"
            :class="isActive
              ? 'bg-[var(--status-available-bg)] text-[var(--status-available-text)]'
              : 'bg-[var(--status-requested-bg)] text-[var(--status-requested-text)]'"
            :style="{ fontSize: '0.75rem', fontWeight: 600 }"
          >
            {{ isActive ? 'Activa' : 'Inactiva' }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <button
        @click="onEdit"
        class="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      >
        <Edit2 class="w-4 h-4" />
      </button>
      <button
        @click="onDelete"
        class="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
      >
        <Trash2 class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
