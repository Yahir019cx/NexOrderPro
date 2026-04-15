<script setup lang="ts">
import { ref, computed } from 'vue'
import { X, Plus, Minus } from 'lucide-vue-next'

interface Product {
  id: number
  name: string
  description?: string
  price: number
  section: string
}

interface SelectedProduct {
  id: number
  name: string
  price: number
  quantity: number
}

const props = defineProps<{
  isOpen: boolean
  onClose: () => void
  onAddProducts: (products: SelectedProduct[]) => void
}>()

const SECTIONS = ['Botellas', 'Refrescos', 'Mixología', 'Cerveza']

const PRODUCTS: Product[] = [
  { id: 1, name: 'Botella Vodka Premium', description: 'Vodka importado 750ml', price: 850, section: 'Botellas' },
  { id: 2, name: 'Botella Ron Añejo', description: 'Ron añejo 7 años 750ml', price: 780, section: 'Botellas' },
  { id: 3, name: 'Botella Whisky', description: 'Whisky escocés 750ml', price: 950, section: 'Botellas' },
  { id: 4, name: 'Coca Cola', description: 'Refresco 355ml', price: 30, section: 'Refrescos' },
  { id: 5, name: 'Agua mineral', description: 'Agua mineral 500ml', price: 25, section: 'Refrescos' },
  { id: 6, name: 'Jugo de naranja', description: 'Jugo natural 300ml', price: 40, section: 'Refrescos' },
  { id: 7, name: 'Mojito', description: 'Ron, menta, limón, azúcar', price: 85, section: 'Mixología' },
  { id: 8, name: 'Margarita', description: 'Tequila, triple sec, limón', price: 90, section: 'Mixología' },
  { id: 9, name: 'Piña Colada', description: 'Ron, crema de coco, piña', price: 110, section: 'Mixología' },
  { id: 10, name: 'Gin Tonic', description: 'Gin premium, tónica', price: 95, section: 'Mixología' },
  { id: 11, name: 'Corona', description: 'Cerveza clara 355ml', price: 60, section: 'Cerveza' },
  { id: 12, name: 'Modelo Especial', description: 'Cerveza clara 355ml', price: 60, section: 'Cerveza' },
  { id: 13, name: 'Cerveza Artesanal', description: 'IPA local 355ml', price: 75, section: 'Cerveza' },
  { id: 14, name: 'Michelada', description: 'Cerveza preparada', price: 90, section: 'Cerveza' },
]

const activeSection = ref(SECTIONS[0])
const selectedProducts = ref<Record<number, number>>({})

const filteredProducts = computed(() =>
  PRODUCTS.filter((p) => p.section === activeSection.value)
)

const handleQuantityChange = (productId: number, delta: number) => {
  const currentQty = selectedProducts.value[productId] || 0
  const newQty = Math.max(0, currentQty + delta)

  if (newQty === 0) {
    const { [productId]: _, ...rest } = selectedProducts.value
    selectedProducts.value = rest
  } else {
    selectedProducts.value = {
      ...selectedProducts.value,
      [productId]: newQty,
    }
  }
}

const handleAddToOrder = () => {
  const productsToAdd: SelectedProduct[] = Object.entries(selectedProducts.value).map(([id, quantity]) => {
    const product = PRODUCTS.find((p) => p.id === Number(id))!
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
    }
  })

  props.onAddProducts(productsToAdd)
  selectedProducts.value = {}
  props.onClose()
}

const totalSelected = computed(() =>
  Object.values(selectedProducts.value).reduce((sum, qty) => sum + qty, 0)
)
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] px-4"
  >
    <div
      class="bg-card rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col relative"
      @click.stop
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-border flex-shrink-0">
        <h3 class="text-foreground" style="font-size: 1.25rem; font-weight: 600">
          Agregar productos
        </h3>
        <button
          @click="onClose"
          class="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-accent"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Tabs -->
      <div class="flex items-center px-6 border-b border-border flex-shrink-0">
        <button
          v-for="section in SECTIONS"
          :key="section"
          @click="activeSection = section"
          class="px-5 py-3 relative transition-all duration-200"
          :class="activeSection === section ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'"
          style="font-size: 0.9375rem; font-weight: 500"
        >
          {{ section }}
          <div
            v-if="activeSection === section"
            class="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
            style="background-color: var(--brand)"
          />
        </button>
      </div>

      <!-- Products -->
      <div class="flex-1 overflow-y-auto px-6 py-6">
        <div class="space-y-3">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="bg-input-background border border-border rounded-lg p-4 flex items-center justify-between"
          >
            <div class="flex-1">
              <h4 class="text-foreground mb-1" style="font-size: 0.9375rem; font-weight: 600">
                {{ product.name }}
              </h4>
              <p
                v-if="product.description"
                class="text-muted-foreground mb-2"
                style="font-size: 0.8125rem"
              >
                {{ product.description }}
              </p>
              <p style="font-size: 1rem; font-weight: 700; color: var(--brand)">
                ${{ product.price.toFixed(2) }}
              </p>
            </div>

            <!-- Quantity -->
            <div class="flex items-center gap-3 ml-4">
              <button
                @click="handleQuantityChange(product.id, -1)"
                :disabled="(selectedProducts[product.id] || 0) === 0"
                class="w-8 h-8 rounded-lg border border-border text-foreground hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Minus class="w-4 h-4" />
              </button>

              <span class="text-foreground w-8 text-center" style="font-size: 1rem; font-weight: 600">
                {{ selectedProducts[product.id] || 0 }}
              </span>

              <button
                @click="handleQuantityChange(product.id, 1)"
                class="w-8 h-8 rounded-lg border text-white hover:opacity-90 transition-all flex items-center justify-center"
                style="background-color: var(--brand); border-color: var(--brand)"
              >
                <Plus class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between px-6 py-5 border-t border-border flex-shrink-0">
        <p class="text-muted-foreground" style="font-size: 0.875rem">
          <span v-if="totalSelected > 0">
            {{ totalSelected }} {{ totalSelected === 1 ? 'producto seleccionado' : 'productos seleccionados' }}
          </span>
          <span v-else>No hay productos seleccionados</span>
        </p>

        <div class="flex gap-3">
          <button
            @click="onClose"
            class="px-4 py-2.5 rounded-lg border border-border text-foreground hover:bg-accent transition-colors"
            style="font-size: 0.875rem; font-weight: 500"
          >
            Cancelar
          </button>
          <button
            @click="handleAddToOrder"
            :disabled="totalSelected === 0"
            class="px-6 py-2.5 rounded-lg text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            :style="{
              fontSize: '0.875rem',
              fontWeight: 500,
              backgroundColor: 'var(--brand)'
            }"
          >
            Agregar a la orden
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
