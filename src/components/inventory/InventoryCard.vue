<script setup lang="ts">
import { Edit2, Trash2, Plus, Minus } from 'lucide-vue-next'

const props = defineProps<{
  name: string
  stock: number
  unit?: string
  lowStockThreshold?: number
  onEdit?: () => void
  onDelete?: () => void
  onStockChange?: (newStock: number) => void
}>()

const unit = props.unit ?? 'piezas'
const lowStockThreshold = props.lowStockThreshold ?? 5

const isLowStock = props.stock <= lowStockThreshold

const handleIncrement = () => {
  props.onStockChange?.(props.stock + 1)
}

const handleDecrement = () => {
  if (props.stock > 0) {
    props.onStockChange?.(props.stock - 1)
  }
}
</script>

<template>
  <div
    class="bg-card rounded-lg p-5 border border-border transition-all duration-200"
    :style="{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }"
  >
    <div class="flex items-start justify-between gap-4 mb-4">
      <!-- Product Info -->
      <div class="flex-1 min-w-0">
        <h3
          class="text-foreground mb-1"
          style="font-size: 1rem; font-weight: 600"
        >
          {{ name }}
        </h3>
        <div
          v-if="isLowStock"
          class="inline-flex items-center px-2 py-0.5 rounded-md mt-1"
          :style="{
            backgroundColor: 'var(--status-occupied-bg)',
            color: 'var(--status-occupied-text)',
            fontSize: '0.75rem',
            fontWeight: 600
          }"
        >
          Stock bajo
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
          @click="onDelete"
          class="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Stock -->
    <div class="flex items-center justify-between pt-4 border-t border-border">
      <div>
        <div
          class="text-muted-foreground mb-1"
          style="font-size: 0.75rem; font-weight: 500"
        >
          Cantidad disponible
        </div>
        <div
          class="text-foreground"
          :style="{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--brand)'
          }"
        >
          {{ stock }}
          <span
            class="text-muted-foreground"
            style="font-size: 0.875rem; font-weight: 400"
          >
            {{ unit }}
          </span>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex items-center gap-2">
        <button
          @click="handleDecrement"
          :disabled="stock === 0"
          class="w-9 h-9 rounded-lg bg-secondary hover:bg-accent text-foreground transition-colors flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Minus class="w-4 h-4" />
        </button>
        <button
          @click="handleIncrement"
          class="w-9 h-9 rounded-lg text-white transition-all hover:opacity-90 flex items-center justify-center"
          :style="{ backgroundColor: 'var(--brand)' }"
        >
          <Plus class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
