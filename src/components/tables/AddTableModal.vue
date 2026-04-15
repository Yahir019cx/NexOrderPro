<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps<{
  isOpen: boolean
  onClose: () => void
  onSave: (tableName: string, tableNumber: string) => void
}>()

const nameInputRef = ref<HTMLInputElement | null>(null)

watch(() => props.isOpen, async (val) => {
  if (val) {
    await nextTick()
    setTimeout(() => {
      nameInputRef.value?.focus()
    }, 100)
  }
})

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    props.onClose()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

const handleSubmit = (e: Event) => {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const tableName = formData.get('tableName') as string
  const tableNumber = formData.get('tableNumber') as string

  if (tableName.trim() && tableNumber.trim()) {
    props.onSave(tableName, tableNumber)
    form.reset()
  }
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-[100] flex items-center justify-center"
    @click="onClose"
  >
    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-black/60 backdrop-blur-sm"
      style="animation: fadeIn 0.2s ease-out"
    />

    <!-- Modal -->
    <div
      class="relative bg-card rounded-2xl border border-border max-w-md w-full mx-4"
      :style="{
        boxShadow: '0 24px 48px rgba(0, 0, 0, 0.4)',
        animation: 'slideUpModal 0.3s ease-out'
      }"
      @click.stop
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-border">
        <h2
          class="text-foreground"
          style="font-size: 1.25rem; font-weight: 600; letter-spacing: -0.01em"
        >
          Agregar mesa
        </h2>
        <button
          @click="onClose"
          class="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-accent"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Form -->
      <form @submit="handleSubmit">
        <div class="px-6 py-6 space-y-5">
          <!-- Name -->
          <div>
            <label
              for="tableName"
              class="block text-foreground mb-2"
              style="font-size: 0.875rem; font-weight: 500"
            >
              Nombre de la mesa
            </label>
            <input
              ref="nameInputRef"
              type="text"
              id="tableName"
              name="tableName"
              placeholder="Ej: Mesa terraza"
              required
              class="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all"
              :style="{
                fontSize: '0.9375rem',
                '--tw-ring-color': 'var(--brand)'
              }"
            />
          </div>

          <!-- Number -->
          <div>
            <label
              for="tableNumber"
              class="block text-foreground mb-2"
              style="font-size: 0.875rem; font-weight: 500"
            >
              Número de mesa
            </label>
            <input
              type="number"
              id="tableNumber"
              name="tableNumber"
              placeholder="Ej: 12"
              required
              min="1"
              class="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all"
              :style="{
                fontSize: '0.9375rem',
                '--tw-ring-color': 'var(--brand)'
              }"
            />
          </div>
        </div>

        <!-- Actions -->
        <div class="px-6 py-5 border-t border-border flex items-center justify-end gap-3">
          <button
            type="button"
            @click="onClose"
            class="px-5 py-2.5 rounded-lg bg-secondary text-foreground hover:bg-accent transition-colors"
            style="font-size: 0.9375rem; font-weight: 500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-5 py-2.5 rounded-lg text-white transition-all hover:opacity-90"
            :style="{
              fontSize: '0.9375rem',
              fontWeight: 500,
              backgroundColor: 'var(--brand)',
              boxShadow: '0 4px 12px rgba(163, 129, 98, 0.3)'
            }"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>

  </div>
</template>

<style>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUpModal {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
