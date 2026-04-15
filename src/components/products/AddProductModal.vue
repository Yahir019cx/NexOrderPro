<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { X } from 'lucide-vue-next'

interface Product {
  id?: number
  name: string
  description: string
  price: number
  section: string
}

const props = defineProps<{
  isOpen: boolean
  onClose: () => void
  onSave: (product: Product) => void
  sections: string[]
  editProduct?: Product | null
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

const selectStyle = computed(() => ({
  fontSize: '0.9375rem',
  '--tw-ring-color': 'var(--brand)',
  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23A38162' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
  backgroundPosition: 'right 0.5rem center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '1.5em 1.5em',
  paddingRight: '2.5rem'
}))

const handleSubmit = (e: Event) => {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const section = formData.get('section') as string

  if (name.trim() && price > 0 && section) {
    props.onSave({
      ...(props.editProduct ? { id: props.editProduct.id } : {}),
      name,
      description,
      price,
      section,
    })
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
          {{ editProduct ? 'Editar producto' : 'Nuevo producto' }}
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
              for="name"
              class="block text-foreground mb-2"
              style="font-size: 0.875rem; font-weight: 500"
            >
              Nombre del producto
            </label>
            <input
              ref="nameInputRef"
              type="text"
              id="name"
              name="name"
              placeholder="Ej: Cerveza Corona"
              required
              :value="editProduct?.name || ''"
              class="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all"
              :style="{
                fontSize: '0.9375rem',
                '--tw-ring-color': 'var(--brand)'
              }"
            />
          </div>

          <!-- Description -->
          <div>
            <label
              for="description"
              class="block text-foreground mb-2"
              style="font-size: 0.875rem; font-weight: 500"
            >
              Descripción <span class="text-muted-foreground">(opcional)</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              :value="editProduct?.description || ''"
              placeholder="Ej: Cerveza clara 355ml"
              class="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all resize-none"
              :style="{
                fontSize: '0.9375rem',
                '--tw-ring-color': 'var(--brand)'
              }"
            />
          </div>

          <!-- Price -->
          <div>
            <label
              for="price"
              class="block text-foreground mb-2"
              style="font-size: 0.875rem; font-weight: 500"
            >
              Precio
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="0.00"
              required
              min="0"
              step="0.01"
              :value="editProduct?.price || ''"
              class="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all"
              :style="{
                fontSize: '0.9375rem',
                '--tw-ring-color': 'var(--brand)'
              }"
            />
          </div>

          <!-- Section -->
          <div>
            <label
              for="section"
              class="block text-foreground mb-2"
              style="font-size: 0.875rem; font-weight: 500"
            >
              Sección
            </label>
            <select
              id="section"
              name="section"
              required
              :value="editProduct?.section || ''"
              class="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer"
              :style="selectStyle"
            >
              <option value="">Seleccionar sección</option>
              <option v-for="section in sections" :key="section" :value="section">
                {{ section }}
              </option>
            </select>
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
