<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { X } from 'lucide-vue-next'

interface Printer {
  id: number
  name: string
  type: 'Cocina' | 'Bar' | 'Caja'
  isActive: boolean
}

const props = defineProps<{
  isOpen: boolean
  onClose: () => void
  onSave: (printerData: { id?: number; name: string; type: 'Cocina' | 'Bar' | 'Caja' }) => void
  editPrinter?: Printer | null
}>()

const name = ref('')
const type = ref<'Cocina' | 'Bar' | 'Caja'>('Cocina')

watch(
  () => [props.isOpen, props.editPrinter],
  ([isOpen, editPrinter]) => {
    if (isOpen && editPrinter) {
      name.value = editPrinter.name
      type.value = editPrinter.type
    } else if (!isOpen) {
      name.value = ''
      type.value = 'Cocina'
    }
  },
  { immediate: true }
)

const selectStyle = computed(() => ({
  fontSize: '0.9375rem',
  '--tw-ring-color': 'var(--brand)',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23A38162' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.75rem center',
  backgroundSize: '1.25rem',
  paddingRight: '2.5rem'
}))

const handleSubmit = (e: Event) => {
  e.preventDefault()
  if (name.value.trim()) {
    props.onSave({
      ...(props.editPrinter ? { id: props.editPrinter.id } : {}),
      name: name.value,
      type: type.value
    })
    props.onClose()
  }
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
  >
    <div
      class="bg-card rounded-xl shadow-2xl w-full max-w-md relative"
      @click.stop
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-border">
        <h3
          class="text-foreground"
          style="font-size: 1.125rem; font-weight: 600"
        >
          {{ editPrinter ? 'Editar impresora' : 'Agregar impresora' }}
        </h3>
        <button
          @click="onClose"
          class="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-accent"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Form -->
      <form @submit="handleSubmit" class="px-6 py-6">
        <div class="space-y-4">
          <!-- Name -->
          <div>
            <label
              for="printerName"
              class="block text-foreground mb-2"
              style="font-size: 0.875rem; font-weight: 500"
            >
              Nombre de la impresora
            </label>
            <input
              type="text"
              id="printerName"
              v-model="name"
              placeholder="Ej: Cocina principal"
              class="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all"
              :style="{
                fontSize: '0.9375rem',
                '--tw-ring-color': 'var(--brand)'
              }"
              required
            />
          </div>

          <!-- Type -->
          <div>
            <label
              for="printerType"
              class="block text-foreground mb-2"
              style="font-size: 0.875rem; font-weight: 500"
            >
              Área
            </label>
            <div class="relative">
              <select
                id="printerType"
                v-model="type"
                class="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer"
                :style="selectStyle"
              >
                <option value="Cocina">Cocina</option>
                <option value="Bar">Bar</option>
                <option value="Caja">Caja</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 mt-6">
          <button
            type="button"
            @click="onClose"
            class="flex-1 px-4 py-3 rounded-lg border border-border text-foreground hover:bg-accent transition-colors"
            style="font-size: 0.875rem; font-weight: 500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-3 rounded-lg text-white transition-all hover:opacity-90"
            :style="{
              fontSize: '0.875rem',
              fontWeight: 500,
              backgroundColor: 'var(--brand)'
            }"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
