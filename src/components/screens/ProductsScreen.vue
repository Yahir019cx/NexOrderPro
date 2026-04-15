<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus } from 'lucide-vue-next'
import ProductCard from '../products/ProductCard.vue'
import AddProductModal from '../products/AddProductModal.vue'
import AddSectionModal from '../products/AddSectionModal.vue'

interface Product {
  id: number
  name: string
  description?: string
  price: number
  section: string
  isActive: boolean
}

const INITIAL_SECTIONS = ['Botellas', 'Refrescos', 'Mixología', 'Cerveza']

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Botella Vodka Premium', description: 'Vodka importado 750ml', price: 850, section: 'Botellas', isActive: true },
  { id: 2, name: 'Botella Ron Añejo', description: 'Ron añejo 7 años 750ml', price: 780, section: 'Botellas', isActive: true },
  { id: 3, name: 'Botella Whisky', description: 'Whisky escocés 750ml', price: 950, section: 'Botellas', isActive: true },
  { id: 4, name: 'Coca Cola', description: 'Refresco 355ml', price: 30, section: 'Refrescos', isActive: true },
  { id: 5, name: 'Agua mineral', description: 'Agua mineral 500ml', price: 25, section: 'Refrescos', isActive: true },
  { id: 6, name: 'Jugo de naranja', description: 'Jugo natural 300ml', price: 40, section: 'Refrescos', isActive: true },
  { id: 7, name: 'Mojito', description: 'Ron, menta, limón, azúcar', price: 85, section: 'Mixología', isActive: true },
  { id: 8, name: 'Margarita', description: 'Tequila, triple sec, limón', price: 90, section: 'Mixología', isActive: true },
  { id: 9, name: 'Piña Colada', description: 'Ron, crema de coco, piña', price: 110, section: 'Mixología', isActive: true },
  { id: 10, name: 'Gin Tonic', description: 'Gin premium, tónica', price: 95, section: 'Mixología', isActive: true },
  { id: 11, name: 'Corona', description: 'Cerveza clara 355ml', price: 60, section: 'Cerveza', isActive: true },
  { id: 12, name: 'Modelo Especial', description: 'Cerveza clara 355ml', price: 60, section: 'Cerveza', isActive: true },
  { id: 13, name: 'Cerveza Artesanal', description: 'IPA local 355ml', price: 75, section: 'Cerveza', isActive: true },
  { id: 14, name: 'Michelada', description: 'Cerveza preparada', price: 90, section: 'Cerveza', isActive: true },
]

const sections = ref([...INITIAL_SECTIONS])
const activeSection = ref(INITIAL_SECTIONS[0])
const isProductModalOpen = ref(false)
const isSectionModalOpen = ref(false)
const editingProduct = ref<Product | null>(null)
const products = ref<Product[]>([...MOCK_PRODUCTS])

const filteredProducts = computed(() =>
  products.value.filter(p => p.section === activeSection.value)
)

function handleSaveProduct(productData: {
  id?: number
  name: string
  description: string
  price: number
  section: string
}) {
  if (productData.id) {
    products.value = products.value.map(p =>
      p.id === productData.id ? { ...p, ...productData } : p
    )
  } else {
    const newProduct: Product = {
      id: Math.max(...products.value.map(p => p.id)) + 1,
      name: productData.name,
      description: productData.description,
      price: productData.price,
      section: productData.section,
      isActive: true,
    }
    products.value.push(newProduct)
  }
  isProductModalOpen.value = false
  editingProduct.value = null
}

function handleEditProduct(product: Product) {
  editingProduct.value = product
  isProductModalOpen.value = true
}

function handleToggleActive(id: number) {
  products.value = products.value.map(p =>
    p.id === id ? { ...p, isActive: !p.isActive } : p
  )
}

function handleDelete(id: number) {
  products.value = products.value.filter(p => p.id !== id)
}

function handleAddSection(sectionName: string) {
  if (!sections.value.includes(sectionName)) {
    sections.value.push(sectionName)
    activeSection.value = sectionName
  }
  isSectionModalOpen.value = false
}
</script>

<template>
  <div class="px-8 py-8">
    <div class="flex items-center justify-between mb-8 border-b border-border">
      <div class="flex items-center gap-2">
        <button
          v-for="section in sections"
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

        <button
          @click="isSectionModalOpen = true"
          class="px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors ml-2"
          title="Agregar sección"
        >
          <Plus class="w-4 h-4" />
        </button>
      </div>

      <button
        @click="() => { editingProduct = null; isProductModalOpen = true }"
        class="px-4 py-2.5 rounded-lg text-white transition-all hover:opacity-90 flex items-center gap-2 mb-2"
        style="font-size: 0.875rem; font-weight: 500; background-color: var(--brand)"
      >
        <Plus class="w-4 h-4" />
        Agregar producto
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :name="product.name"
        :description="product.description"
        :price="product.price"
        :isActive="product.isActive"
        @edit="handleEditProduct(product)"
        @delete="handleDelete(product.id)"
        @toggleActive="handleToggleActive(product.id)"
      />
    </div>

    <div v-if="filteredProducts.length === 0" class="text-center py-16">
      <p class="text-muted-foreground" style="font-size: 0.9375rem">
        No hay productos en esta sección
      </p>
    </div>

    <AddProductModal
      :isOpen="isProductModalOpen"
      @close="() => { isProductModalOpen = false; editingProduct = null }"
      @save="handleSaveProduct"
      :sections="sections"
      :editProduct="editingProduct"
    />

    <AddSectionModal
      :isOpen="isSectionModalOpen"
      @close="isSectionModalOpen = false"
      @save="handleAddSection"
    />
  </div>
</template>
