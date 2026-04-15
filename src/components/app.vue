```vue id="app92841"
<script setup lang="ts">
import { ref, computed } from 'vue'
import Sidebar from './global/Sidebar.vue'
import TopBar from './global/TopBar.vue'
import TableCard from './tables/TableCard.vue'
import FAB from './global/FAB.vue'
import TableFilter from './tables/TableFilter.vue'
import AddTableModal from './tables/AddTableModal.vue'
import TableDetailPanel from './tables/TableDetailPanel.vue'
import HomeScreen from './screens/HomeScreen.vue'
import ProductsScreen from './screens/ProductsScreen.vue'
import InventoryScreen from './screens/InventoryScreen.vue'
import UsersScreen from './screens/UsersScreen.vue'
import CashierScreen from './screens/CashierScreen.vue'
import SettingsScreen from './screens/SettingsScreen.vue'
import LoginScreen from './screens/LoginScreen.vue'
import Footer from './global/Footer.vue'

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

const tables: Table[] = [
  { id: 1, name: 'Mesa 1', status: 'ocupada', peopleCount: 4, items: [{ id: 1, name: 'Cerveza', quantity: 2, price: 60 }] },
  { id: 2, name: 'Mesa 2', status: 'disponible' },
  { id: 3, name: 'Mesa 3', status: 'ocupada', peopleCount: 2 },
  { id: 4, name: 'Mesa 4', status: 'cuenta-pedida', peopleCount: 6 },
]

const isAuthenticated = ref(false)
const isSidebarExpanded = ref(true)
const activeScreen = ref('home')
const activeFilter = ref<'todas' | TableStatus>('todas')
const isModalOpen = ref(false)
const selectedTable = ref<Table | null>(null)

const handleAddTable = (tableName: string, tableNumber: string) => {
  console.log('Adding table:', { tableName, tableNumber })
  isModalOpen.value = false
}

const handleTableClick = (table: Table) => {
  selectedTable.value = table
}

const handleCloseDetail = () => {
  selectedTable.value = null
}

const getModuleName = () => {
  switch (activeScreen.value) {
    case 'home': return 'Inicio'
    case 'tables': return 'Gestión de Mesas'
    case 'products': return 'Productos'
    case 'inventory': return 'Inventario'
    case 'users': return 'Usuarios'
    case 'cashier': return 'Caja'
    case 'settings': return 'Configuración'
    default: return 'Inicio'
  }
}

const filterCounts = computed(() => ({
  todas: tables.length,
  disponible: tables.filter(t => t.status === 'disponible').length,
  ocupada: tables.filter(t => t.status === 'ocupada').length,
  'cuenta-pedida': tables.filter(t => t.status === 'cuenta-pedida').length,
}))

const filteredTables = computed(() => {
  if (activeFilter.value === 'todas') return tables
  return tables.filter(t => t.status === activeFilter.value)
})
</script>

<template>
  <LoginScreen v-if="!isAuthenticated" @login="isAuthenticated = true" />

  <div v-else class="min-h-screen bg-background relative overflow-x-hidden flex flex-col">
    <Sidebar
      :isExpanded="isSidebarExpanded"
      @toggle="isSidebarExpanded = !isSidebarExpanded"
      :activeScreen="activeScreen"
      @navigate="val => activeScreen = val"
    />

    <TopBar
      :isSidebarExpanded="isSidebarExpanded"
      :moduleName="getModuleName()"
      @logout="isAuthenticated = false"
    />

    <main
      class="pt-16 transition-all duration-300 flex-1"
      :style="{ marginLeft: isSidebarExpanded ? '16rem' : '5rem' }"
    >
      <HomeScreen v-if="activeScreen === 'home'" @navigate="val => activeScreen = val" />

      <div v-if="activeScreen === 'tables'" class="px-8 py-8">
        <TableFilter
          :activeFilter="activeFilter"
          @filterChange="val => activeFilter = val"
          :counts="filterCounts"
        />

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <div v-for="(table, index) in filteredTables" :key="table.id">
            <TableCard
              :name="table.name"
              :status="table.status"
              :peopleCount="table.peopleCount"
              @click="handleTableClick(table)"
            />
          </div>
        </div>
      </div>

      <ProductsScreen v-if="activeScreen === 'products'" />
      <InventoryScreen v-if="activeScreen === 'inventory'" />
      <UsersScreen v-if="activeScreen === 'users'" />
      <CashierScreen v-if="activeScreen === 'cashier'" />
      <SettingsScreen v-if="activeScreen === 'settings'" />

      <div
        v-if="!['home','tables','products','inventory','users','cashier','settings'].includes(activeScreen)"
        class="px-8 py-8 text-center"
      >
        <p class="text-muted-foreground">Pantalla en desarrollo</p>
      </div>
    </main>

    <div :style="{ marginLeft: isSidebarExpanded ? '16rem' : '5rem' }">
      <Footer />
    </div>

    <FAB v-if="activeScreen === 'tables'" @click="isModalOpen = true" />

    <AddTableModal
      :isOpen="isModalOpen"
      @close="isModalOpen = false"
      @save="handleAddTable"
    />

    <TableDetailPanel
      v-if="selectedTable"
      :isOpen="!!selectedTable"
      @close="handleCloseDetail"
      :tableName="selectedTable.name"
      :status="selectedTable.status"
      :items="selectedTable.items"
      :peopleCount="selectedTable.peopleCount"
      @addProducts="products => console.log(products)"
    />
  </div>
</template>
```
