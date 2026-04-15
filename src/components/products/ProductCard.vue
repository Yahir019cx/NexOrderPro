<script setup lang="ts">
import { Edit2, Trash2, Pause, Play } from 'lucide-vue-next'

const props = defineProps<{
  name: string
  description?: string
  price: number
  isActive?: boolean
  onEdit?: () => void
  onDelete?: () => void
  onToggleActive?: () => void
}>()

const isActive = props.isActive ?? true
</script>

<template>
  <div
    :class="[
      'bg-card rounded-lg p-5 border border-border transition-all duration-200',
      !isActive ? 'opacity-60' : ''
    ]"
    :style="{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }"
  >
    <div class="flex items-start justify-between gap-4">
      <!-- Info -->
      <div class="flex-1 min-w-0">
        <h3
          class="text-foreground mb-1"
          style="font-size: 1rem; font-weight: 600"
        >
          {{ name }}
        </h3>

        <p
          v-if="description"
          class="text-muted-foreground mb-3 line-clamp-2"
          style="font-size: 0.875rem"
        >
          {{ description }}
        </p>

        <div
          class="text-foreground"
          :style="{
            fontSize: '1.125rem',
            fontWeight: 700,
            color: 'var(--brand)'
          }"
        >
          ${{ price.toFixed(2) }}
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <button
          @click="onEdit"
          class="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <Edit2 class="w-4 h-4" />
        </button>

        <button
          @click="onToggleActive"
          class="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <Pause v-if="isActive" class="w-4 h-4" />
          <Play v-else class="w-4 h-4" />
        </button>

        <button
          @click="onDelete"
          class="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
