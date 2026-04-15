<script setup>
import { Edit2, Trash2, Shield, User as UserIcon, Pause, Play } from 'lucide-vue-next'

const props = defineProps({
  name: String,
  role: String,
  isActive: {
    type: Boolean,
    default: true
  },
  onEdit: Function,
  onDelete: Function,
  onToggleActive: Function
})
</script>

<template>
  <div
    :class="[
      'bg-card rounded-lg p-5 border border-border transition-all duration-200',
      !isActive && 'opacity-60'
    ]"
    :style="{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }"
  >
    <div class="flex items-start justify-between gap-4">
      <!-- User Info -->
      <div class="flex items-start gap-4 flex-1">
        <!-- Avatar -->
        <div
          class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          :style="{
            backgroundColor:
              role === 'Admin'
                ? 'var(--brand-light)'
                : 'rgba(163, 129, 98, 0.1)'
          }"
        >
          <Shield
            v-if="role === 'Admin'"
            class="w-5 h-5"
            style="color: var(--brand)"
          />
          <UserIcon
            v-else
            class="w-5 h-5"
            style="color: #999999"
          />
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <h3
            class="text-foreground mb-1"
            style="font-size: 1rem; font-weight: 600;"
          >
            {{ name }}
          </h3>
          <div class="flex items-center gap-3">
            <span class="text-muted-foreground" style="font-size: 0.875rem;">
              {{ role }}
            </span>
            <div
              :class="[
                'inline-flex items-center px-2 py-0.5 rounded-md',
                isActive
                  ? 'bg-[var(--status-available-bg)] text-[var(--status-available-text)]'
                  : 'bg-[var(--status-requested-bg)] text-[var(--status-requested-text)]'
              ]"
              style="font-size: 0.75rem; font-weight: 600;"
            >
              {{ isActive ? 'Activo' : 'Inactivo' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <button
          @click="onEdit"
          class="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Editar"
        >
          <Edit2 class="w-4 h-4" />
        </button>

        <button
          @click="onToggleActive"
          class="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          :aria-label="isActive ? 'Pausar' : 'Activar'"
        >
          <Pause v-if="isActive" class="w-4 h-4" />
          <Play v-else class="w-4 h-4" />
        </button>

        <button
          @click="onDelete"
          class="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          aria-label="Eliminar"
        >
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
