<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { X, Plus, Receipt } from 'lucide-vue-next'
import AddProductsToOrderModal from './AddProductsToOrderModal.vue'

const props = defineProps({
  isOpen: Boolean,
  onClose: Function,
  tableName: String,
  status: String,
  items: {
    type: Array,
    default: () => []
  },
  peopleCount: Number,
  onAddProducts: Function
})

const isAddProductsModalOpen = ref(false)

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

const subtotal = computed(() =>
  props.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

const total = computed(() => subtotal.value)

const handleAddProducts = (products) => {
  props.onAddProducts && props.onAddProducts(products)
  isAddProductsModalOpen.value = false
}

const handleEscape = (e) => {
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
</script>

<template>
  <!-- Overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
    style="animation: fadeIn 0.2s ease-out"
    @click="onClose"
  />

  <!-- Panel -->
  <div
    :class="[
      'fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-card border-l border-border z-[95] transition-transform duration-300 ease-out flex flex-col',
      isOpen ? 'translate-x-0' : 'translate-x-full'
    ]"
    :style="{ boxShadow: '-8px 0 32px rgba(0,0,0,0.3)' }"
  >
    <!-- Header -->
    <div class="flex-shrink-0 px-6 py-5 border-b border-border bg-card/50">
      <div class="flex items-start justify-between mb-3">
        <h2
          class="text-foreground"
          style="font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em;"
        >
          {{ tableName }}
        </h2>
        <button
          @click="onClose"
          class="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-accent -mt-1"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="flex items-center gap-3">
        <div
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md"
          :style="{ backgroundColor: config.bgColor, color: config.textColor }"
        >
          <div class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: config.textColor }" />
          <span style="font-size: 0.75rem; font-weight: 600;">
            {{ config.label }}
          </span>
        </div>

        <span
          v-if="peopleCount !== undefined"
          class="text-muted-foreground"
          style="font-size: 0.875rem;"
        >
          {{ peopleCount }} {{ peopleCount === 1 ? 'persona' : 'personas' }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto px-6 py-6">
      <div v-if="status === 'disponible'" class="flex flex-col items-center justify-center h-full text-center">
        <div
          class="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style="background-color: var(--brand-light)"
        >
          <Receipt class="w-8 h-8" style="color: var(--brand)" />
        </div>
        <h3 class="text-foreground mb-2" style="font-size: 1.125rem; font-weight: 600;">
          Mesa disponible
        </h3>
        <p class="text-muted-foreground" style="font-size: 0.9375rem;">
          Esta mesa está libre y lista para recibir clientes
        </p>
      </div>

      <div v-else>
        <div class="mb-6">
          <h3
            class="text-foreground mb-4 uppercase tracking-wider"
            style="font-size: 0.75rem; font-weight: 700; opacity: 0.7;"
          >
            Productos
          </h3>

          <div v-if="items.length > 0" class="space-y-3">
            <div
              v-for="item in items"
              :key="item.id"
              class="flex items-start justify-between py-2 border-b border-border/50"
            >
              <div class="flex-1">
                <div class="flex items-baseline gap-2">
                  <span class="text-foreground" style="font-size: 0.9375rem; font-weight: 500;">
                    {{ item.name }}
                  </span>
                  <span class="text-muted-foreground" style="font-size: 0.875rem;">
                    x{{ item.quantity }}
                  </span>
                </div>
              </div>
              <span class="text-foreground ml-4" style="font-size: 0.9375rem; font-weight: 600;">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </span>
            </div>
          </div>

          <p v-else class="text-muted-foreground" style="font-size: 0.875rem;">
            Sin productos agregados
          </p>
        </div>

        <div v-if="items.length > 0" class="border-t-2 border-border pt-4 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-muted-foreground" style="font-size: 0.9375rem;">
              Subtotal
            </span>
            <span class="text-foreground" style="font-size: 0.9375rem; font-weight: 500;">
              ${{ subtotal.toFixed(2) }}
            </span>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-border">
            <span class="text-foreground" style="font-size: 1.125rem; font-weight: 700;">
              Total
            </span>
            <span
              class="text-foreground"
              style="font-size: 1.25rem; font-weight: 700; color: var(--brand);"
            >
              ${{ total.toFixed(2) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex-shrink-0 px-6 py-5 border-t border-border bg-card/50 space-y-3">
      <button
        @click="isAddProductsModalOpen = true"
        class="w-full px-4 py-3 rounded-lg bg-secondary hover:bg-accent text-foreground transition-colors flex items-center justify-center gap-2"
        style="font-size: 0.9375rem; font-weight: 500;"
      >
        <Plus class="w-4 h-4" />
        Agregar productos
      </button>

      <button
        v-if="status === 'ocupada' && items.length > 0"
        class="w-full px-4 py-3 rounded-lg border border-border text-foreground hover:bg-accent transition-colors"
        style="font-size: 0.9375rem; font-weight: 500;"
      >
        Solicitar cuenta
      </button>

      <button
        v-if="status === 'cuenta-pedida'"
        class="w-full px-4 py-3 rounded-lg text-white transition-all hover:opacity-90 flex items-center justify-center gap-2"
        style="font-size: 0.9375rem; font-weight: 500; background-color: var(--brand);"
      >
        <Receipt class="w-4 h-4" />
        Imprimir ticket
      </button>
    </div>
  </div>

  <AddProductsToOrderModal
    :isOpen="isAddProductsModalOpen"
    :onClose="() => (isAddProductsModalOpen = false)"
    :onAddProducts="handleAddProducts"
  />


</template>

<style>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
