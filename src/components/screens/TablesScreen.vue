<script setup lang="ts">
import { ref, computed } from 'vue'
import TableCard from '../tables/TableCard.vue'
import TableFilter from '../tables/TableFilter.vue'
import TableDetailPanel from '../tables/TableDetailPanel.vue'
import AddTableModal from '../tables/AddTableModal.vue'
import FAB from '../global/FAB.vue'

type TableStatus = 'disponible' | 'ocupada' | 'cuenta-pedida'

interface OrderItem {
  id: number
  name: string
  quantity: number
  price: number
}

interface Table {
  id: number
  name: string
  status: TableStatus
  peopleCount?: number
  items?: OrderItem[]
}

const tables = ref<Table[]>([
  { id: 1, name: 'Mesa 1', status: 'ocupada',       peopleCount: 4, items: [{ id: 1, name: 'Cerveza', quantity: 2, price: 60 }] },
  { id: 2, name: 'Mesa 2', status: 'disponible' },
  { id: 3, name: 'Mesa 3', status: 'ocupada',       peopleCount: 2 },
  { id: 4, name: 'Mesa 4', status: 'cuenta-pedida', peopleCount: 6 },
  { id: 5, name: 'Mesa 5', status: 'disponible' },
  { id: 6, name: 'Mesa 6', status: 'ocupada',       peopleCount: 3 },
])

const activeFilter = ref<'todas' | TableStatus>('todas')
const isModalOpen = ref(false)
const selectedTable = ref<Table | null>(null)

const filterCounts = computed(() => ({
  todas:           tables.value.length,
  disponible:      tables.value.filter(t => t.status === 'disponible').length,
  ocupada:         tables.value.filter(t => t.status === 'ocupada').length,
  'cuenta-pedida': tables.value.filter(t => t.status === 'cuenta-pedida').length,
}))

const filteredTables = computed(() =>
  activeFilter.value === 'todas'
    ? tables.value
    : tables.value.filter(t => t.status === activeFilter.value),
)

function handleAddTable(tableName: string, tableNumber: string) {
  const newId = Math.max(...tables.value.map(t => t.id)) + 1
  tables.value.push({ id: newId, name: tableName || `Mesa ${tableNumber}`, status: 'disponible' })
  isModalOpen.value = false
}
</script>

<template>
  <div class="tables-screen">
    <TableFilter
      :activeFilter="activeFilter"
      :counts="filterCounts"
      :onFilterChange="(val: string) => activeFilter = val as typeof activeFilter.value"
    />

    <div class="tables-grid">
      <TableCard
        v-for="table in filteredTables"
        :key="table.id"
        :name="table.name"
        :status="table.status"
        :peopleCount="table.peopleCount"
        :onClick="() => selectedTable = table"
      />
    </div>

    <div v-if="filteredTables.length === 0" class="tables-empty">
      <p>No hay mesas en este estado</p>
    </div>

    <FAB :onClick="() => isModalOpen = true" />

    <AddTableModal
      :isOpen="isModalOpen"
      :onClose="() => isModalOpen = false"
      :onSave="handleAddTable"
    />

    <TableDetailPanel
      v-if="selectedTable"
      :isOpen="!!selectedTable"
      :tableName="selectedTable.name"
      :status="selectedTable.status"
      :items="selectedTable.items"
      :peopleCount="selectedTable.peopleCount"
      :onClose="() => selectedTable = null"
      :onAddProducts="(products: OrderItem[]) => console.log(products)"
    />
  </div>
</template>

<style scoped>
.tables-screen { padding: 32px; }
.tables-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
.tables-empty {
  text-align: center;
  padding: 64px 0;
  color: rgba(255,255,255,0.4);
  font-size: 0.9375rem;
}
</style>
