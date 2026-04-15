<script setup>
import { ref, computed } from 'vue'
import { Search, Calendar } from 'lucide-vue-next'
import ClosedOrderCard from '../cashier/ClosedOrderCard.vue'
import TicketDetailPanel from '../cashier/TicketDetailPanel.vue'

const searchQuery = ref('')
const dateFilter = ref('today')
const selectedOrder = ref(null)
const showBreakdown = ref(false)

const MOCK_CLOSED_ORDERS = [
  {
    id: 1,
    tableName: 'Mesa 4',
    total: 990,
    date: '14 Abr 2026',
    time: '21:45',
    items: [
      { id: 1, name: 'Cerveza', quantity: 4, price: 60 },
      { id: 2, name: 'Botella vodka', quantity: 1, price: 850 },
      { id: 3, name: 'Servicio de hielos', quantity: 1, price: 50 },
      { id: 4, name: 'Refresco', quantity: 6, price: 30 }
    ]
  },
  {
    id: 2,
    tableName: 'Mesa 1',
    total: 375,
    date: '14 Abr 2026',
    time: '20:30',
    items: [
      { id: 1, name: 'Cerveza', quantity: 2, price: 60 },
      { id: 2, name: 'Michelada', quantity: 1, price: 90 },
      { id: 3, name: 'Tequila shot', quantity: 3, price: 45 }
    ]
  },
  {
    id: 3,
    tableName: 'Mesa 9',
    total: 585,
    date: '14 Abr 2026',
    time: '19:15',
    items: [
      { id: 1, name: 'Gin tonic', quantity: 2, price: 95 },
      { id: 2, name: 'Piña colada', quantity: 2, price: 110 },
      { id: 3, name: 'Botella vino tinto', quantity: 1, price: 380 }
    ]
  },
  {
    id: 4,
    tableName: 'Mesa 6',
    total: 260,
    date: '14 Abr 2026',
    time: '18:45',
    items: [
      { id: 1, name: 'Mojito', quantity: 2, price: 85 },
      { id: 2, name: 'Margarita', quantity: 1, price: 90 }
    ]
  },
  {
    id: 5,
    tableName: 'Mesa 8',
    total: 1030,
    date: '14 Abr 2026',
    time: '17:20',
    items: [
      { id: 1, name: 'Botella ron', quantity: 1, price: 780 },
      { id: 2, name: 'Refresco', quantity: 5, price: 30 },
      { id: 3, name: 'Servicio de mesa', quantity: 1, price: 100 }
    ]
  },
  {
    id: 6,
    tableName: 'Mesa 3',
    total: 240,
    date: '13 Abr 2026',
    time: '22:10',
    items: [
      { id: 1, name: 'Café americano', quantity: 2, price: 35 },
      { id: 2, name: 'Whisky', quantity: 2, price: 120 }
    ]
  },
  {
    id: 7,
    tableName: 'Mesa 11',
    total: 340,
    date: '13 Abr 2026',
    time: '21:00',
    items: [
      { id: 1, name: 'Mezcal', quantity: 2, price: 95 },
      { id: 2, name: 'Cerveza artesanal', quantity: 2, price: 75 }
    ]
  },
  {
    id: 8,
    tableName: 'Mesa 2',
    total: 450,
    date: '13 Abr 2026',
    time: '20:15',
    items: [
      { id: 1, name: 'Cerveza', quantity: 3, price: 60 },
      { id: 2, name: 'Tequila shot', quantity: 6, price: 45 }
    ]
  }
]

const filteredOrders = computed(() => {
  let filtered = MOCK_CLOSED_ORDERS

  if (dateFilter.value === 'today') {
    filtered = filtered.filter(o => o.date === '14 Abr 2026')
  } else if (dateFilter.value === 'yesterday') {
    filtered = filtered.filter(o => o.date === '13 Abr 2026')
  }

  if (searchQuery.value.trim()) {
    filtered = filtered.filter(o =>
      o.tableName.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return filtered
})

const todayOrders = computed(() =>
  MOCK_CLOSED_ORDERS.filter(o => o.date === '14 Abr 2026')
)

const todaySales = computed(() =>
  todayOrders.value.reduce((sum, o) => sum + o.total, 0)
)

const todayCount = computed(() => todayOrders.value.length)

const cashSales = computed(() => todaySales.value * 0.58)
const cardSales = computed(() => todaySales.value * 0.42)

const handleReprint = () => {
  console.log('Reimprimiendo ticket...')
}
</script>

<template>
  <div class="px-8 py-8">
    <!-- Summary -->
    <div class="mb-8">
      <div
        class="bg-card rounded-xl p-6 border border-border mb-4"
        style="box-shadow:0 2px 8px rgba(0,0,0,0.15); background:linear-gradient(135deg, rgba(163,129,98,0.05) 0%, rgba(26,26,26,1) 100%);"
      >
        <div class="flex items-center justify-between">
          <div>
            <div class="text-muted-foreground mb-2" style="font-size:0.875rem; font-weight:500;">
              Ventas del día
            </div>
            <div class="text-foreground mb-1" style="font-size:2.5rem; font-weight:700; line-height:1; color:var(--brand);">
              ${{ todaySales.toFixed(2) }}
            </div>
            <div class="text-muted-foreground" style="font-size:0.875rem;">
              {{ todayCount }} {{ todayCount === 1 ? 'cuenta cerrada' : 'cuentas cerradas' }}
            </div>
          </div>

          <button
            @click="showBreakdown = !showBreakdown"
            class="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            style="font-size:0.875rem; font-weight:500;"
          >
            {{ showBreakdown ? 'Ocultar desglose' : 'Ver desglose' }}
          </button>
        </div>
      </div>

      <div v-if="showBreakdown" class="flex items-center gap-4 px-4">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full" style="background-color:var(--status-available);" />
          <span class="text-muted-foreground" style="font-size:0.875rem;">Efectivo:</span>
          <span class="text-foreground" style="font-size:1.125rem; font-weight:600;">
            ${{ cashSales.toFixed(2) }}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full" style="background-color:var(--status-occupied);" />
          <span class="text-muted-foreground" style="font-size:0.875rem;">Tarjeta:</span>
          <span class="text-foreground" style="font-size:1.125rem; font-weight:600;">
            ${{ cardSales.toFixed(2) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-3 mb-6">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          v-model="searchQuery"
          placeholder="Buscar por mesa..."
          class="w-full pl-10 pr-4 py-2.5 bg-input-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2"
          style="font-size:0.875rem; --tw-ring-color:var(--brand);"
        />
      </div>

      <div class="flex items-center gap-2">
        <Calendar class="w-4 h-4 text-muted-foreground" />
        <button @click="dateFilter='today'" :class="dateFilter==='today' ? 'text-white border-transparent' : 'border-border hover:bg-accent'"
          class="px-4 py-2.5 rounded-lg border"
          :style="dateFilter==='today' ? {backgroundColor:'var(--brand)'} : {}">
          Hoy
        </button>
        <button @click="dateFilter='yesterday'" :class="dateFilter==='yesterday' ? 'text-white border-transparent' : 'border-border hover:bg-accent'"
          class="px-4 py-2.5 rounded-lg border"
          :style="dateFilter==='yesterday' ? {backgroundColor:'var(--brand)'} : {}">
          Ayer
        </button>
        <button @click="dateFilter='all'" :class="dateFilter==='all' ? 'text-white border-transparent' : 'border-border hover:bg-accent'"
          class="px-4 py-2.5 rounded-lg border"
          :style="dateFilter==='all' ? {backgroundColor:'var(--brand)'} : {}">
          Todas
        </button>
      </div>
    </div>

    <!-- List -->
    <div class="space-y-4">
      <ClosedOrderCard
        v-for="order in filteredOrders"
        :key="order.id"
        :tableName="order.tableName"
        :total="order.total"
        :date="order.date"
        :time="order.time"
        @click="selectedOrder = order"
      />
    </div>

    <div v-if="filteredOrders.length === 0" class="text-center py-16">
      <p class="text-muted-foreground" style="font-size:0.9375rem;">
        {{ searchQuery || dateFilter !== 'all' ? 'No se encontraron cuentas' : 'No hay cuentas cerradas' }}
      </p>
    </div>

    <TicketDetailPanel
      v-if="selectedOrder"
      :isOpen="!!selectedOrder"
      :onClose="() => (selectedOrder = null)"
      :tableName="selectedOrder.tableName"
      :items="selectedOrder.items"
      :date="selectedOrder.date"
      :time="selectedOrder.time"
      :onReprint="handleReprint"
    />
  </div>
</template>
