<script setup>
import { ref, computed } from 'vue'
import { Plus, Search, AlertTriangle } from 'lucide-vue-next'
import InventoryCard from '../inventory/InventoryCard.vue'
import AddInventoryModal from '../inventory/AddInventoryModal.vue'

const SECTIONS = ['Botellas', 'Refrescos', 'Mixología', 'Cerveza']

const MOCK_INVENTORY = [
  { id: 1, name: 'Maestro Dobel', size: '750ml', stock: 12, section: 'Botellas', unit: 'botellas', lowStockThreshold: 5 },
  { id: 2, name: 'Centenario', size: '700ml', stock: 3, section: 'Botellas', unit: 'botellas', lowStockThreshold: 5 },
  { id: 3, name: 'Vodka Premium', size: '750ml', stock: 8, section: 'Botellas', unit: 'botellas', lowStockThreshold: 5 },
  { id: 4, name: 'Ron Añejo', size: '750ml', stock: 2, section: 'Botellas', unit: 'botellas', lowStockThreshold: 5 },
  { id: 5, name: 'Coca Cola', size: '355ml', stock: 48, section: 'Refrescos', unit: 'piezas', lowStockThreshold: 20 },
  { id: 6, name: 'Agua mineral', size: '1.5L', stock: 15, section: 'Refrescos', unit: 'piezas', lowStockThreshold: 10 },
  { id: 7, name: 'Agua mineral', size: '355ml', stock: 8, section: 'Refrescos', unit: 'piezas', lowStockThreshold: 20 },
  { id: 8, name: 'Jugo de naranja', size: '1L', stock: 6, section: 'Refrescos', unit: 'piezas', lowStockThreshold: 5 },
  { id: 9, name: 'Menta fresca', size: 'manojo', stock: 4, section: 'Mixología', unit: 'manojos', lowStockThreshold: 3 },
  { id: 10, name: 'Limón', size: 'kg', stock: 12, section: 'Mixología', unit: 'kg', lowStockThreshold: 5 },
  { id: 11, name: 'Triple Sec', size: '750ml', stock: 6, section: 'Mixología', unit: 'botellas', lowStockThreshold: 3 },
  { id: 12, name: 'Corona', size: '355ml', stock: 72, section: 'Cerveza', unit: 'piezas', lowStockThreshold: 24 },
  { id: 13, name: 'Modelo Especial', size: '355ml', stock: 18, section: 'Cerveza', unit: 'piezas', lowStockThreshold: 24 },
  { id: 14, name: 'Cerveza Artesanal IPA', size: '355ml', stock: 12, section: 'Cerveza', unit: 'piezas', lowStockThreshold: 12 }
]

const activeSection = ref(SECTIONS[0])
const isModalOpen = ref(false)
const editingItem = ref(null)
const inventory = ref([...MOCK_INVENTORY])
const searchQuery = ref('')
const showLowStockOnly = ref(false)

const filteredInventory = computed(() => {
  let filtered = inventory.value.filter(i => i.section === activeSection.value)

  if (searchQuery.value.trim()) {
    filtered = filtered.filter(i =>
      `${i.name} ${i.size}`.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (showLowStockOnly.value) {
    filtered = filtered.filter(i => i.stock <= i.lowStockThreshold)
  }

  return filtered
})

const lowStockCount = computed(() =>
  inventory.value.filter(i =>
    i.section === activeSection.value && i.stock <= i.lowStockThreshold
  ).length
)

const handleSaveItem = (itemData) => {
  if (itemData.id) {
    inventory.value = inventory.value.map(i =>
      i.id === itemData.id ? { ...i, ...itemData } : i
    )
  } else {
    const newItem = {
      id: Math.max(...inventory.value.map(i => i.id)) + 1,
      name: itemData.name,
      size: itemData.size,
      stock: itemData.stock,
      section: itemData.section,
      unit: 'piezas',
      lowStockThreshold: 5
    }
    inventory.value.push(newItem)
  }

  isModalOpen.value = false
  editingItem.value = null
}

const handleEditItem = (item) => {
  editingItem.value = item
  isModalOpen.value = true
}

const handleDelete = (id) => {
  inventory.value = inventory.value.filter(i => i.id !== id)
}

const handleStockChange = (id, newStock) => {
  inventory.value = inventory.value.map(i =>
    i.id === id ? { ...i, stock: newStock } : i
  )
}
</script>

<template>
  <div class="px-8 py-8">
    <!-- Tabs -->
    <div class="flex justify-between mb-6 border-b border-border">
      <div class="flex gap-2">
        <button
          v-for="section in SECTIONS"
          :key="section"
          @click="activeSection = section"
          class="px-5 py-3 relative"
          :class="activeSection === section ? 'text-foreground' : 'text-muted-foreground'"
        >
          {{ section }}
          <div v-if="activeSection === section" class="absolute bottom-0 left-0 right-0 h-0.5" style="background:var(--brand)" />
        </button>
      </div>

      <button
        @click="() => { editingItem = null; isModalOpen = true }"
        class="px-4 py-2.5 text-white flex items-center gap-2 mb-2"
        style="background:var(--brand)"
      >
        <Plus class="w-4 h-4" />
        Agregar producto
      </button>
    </div>

    <!-- Search -->
    <div class="flex gap-3 mb-6">
      <div class="relative flex-1 max-w-md">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          v-model="searchQuery"
          placeholder="Buscar producto..."
          class="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg"
        />
      </div>

      <button
        @click="showLowStockOnly = !showLowStockOnly"
        class="px-4 py-2.5 flex items-center gap-2"
        :style="showLowStockOnly ? { background: 'var(--status-occupied)', color: 'white' } : {}"
      >
        <AlertTriangle class="w-4 h-4" />
        Stock bajo <span v-if="lowStockCount">({{ lowStockCount }})</span>
      </button>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <InventoryCard
        v-for="item in filteredInventory"
        :key="item.id"
        :name="`${item.name} ${item.size}`"
        :stock="item.stock"
        :unit="item.unit"
        :lowStockThreshold="item.lowStockThreshold"
        @edit="() => handleEditItem(item)"
        @delete="() => handleDelete(item.id)"
        @stockChange="(val) => handleStockChange(item.id, val)"
      />
    </div>

    <div v-if="filteredInventory.length === 0" class="text-center py-16">
      <p>
        {{ searchQuery || showLowStockOnly
          ? 'No se encontraron productos'
          : 'No hay productos en esta sección' }}
      </p>
    </div>

    <AddInventoryModal
      :isOpen="isModalOpen"
      :onClose="() => { isModalOpen = false; editingItem = null }"
      :onSave="handleSaveItem"
      :sections="SECTIONS"
      :editItem="editingItem"
    />
  </div>
</template>
