<script setup>
import { ShoppingBag, CircleDot, Package, Wallet, AlertTriangle } from 'lucide-vue-next'

const props = defineProps({
  onNavigate: Function
})

const recentOrders = [
  { id: '#00042', table: 'Mesa 5', amount: '$295.00', time: 'Hace 5 min' },
  { id: '#00041', table: 'Mesa 3', amount: '$450.00', time: 'Hace 15 min' },
  { id: '#00040', table: 'Mesa 8', amount: '$680.00', time: 'Hace 25 min' }
]

const lowStockItems = [
  { name: 'Cerveza Corona',      stock: 12, unit: 'pzas' },
  { name: 'Vodka Premium 750ml', stock: 3,  unit: 'pzas' },
  { name: 'Refresco Coca Cola',  stock: 8,  unit: 'pzas' }
]

const todayDate = new Date().toLocaleDateString('es-MX', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
</script>

<template>
  <div class="px-8 py-8">

    <!-- Header -->
    <div class="mb-8 flex items-start justify-between">
      <div>
        <h2 style="font-size:2rem; font-weight:700; letter-spacing:-0.02em; color:var(--color-foreground)">
          Bienvenido de vuelta
        </h2>
        <p class="mt-1" style="font-size:1rem; color:var(--color-muted-foreground)">
          Aquí está el resumen de hoy
        </p>
      </div>
      <p style="font-size:0.9rem; color:var(--color-muted-foreground); padding-top:4px">
        {{ todayDate }}
      </p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-4 gap-5 mb-8">
      <div class="stat-card">
        <p class="stat-label">Ventas del día</p>
        <p class="stat-value">$2,450</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">Mesas activas</p>
        <p class="stat-value">7</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">Órdenes completadas</p>
        <p class="stat-value">42</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">Clientes atendidos</p>
        <p class="stat-value">128</p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="mb-8">
      <h3 class="section-title mb-4">Acciones rápidas</h3>

      <div class="grid grid-cols-4 gap-4">
        <button @click="onNavigate('tables')" class="action-card">
          <div class="action-icon">
            <CircleDot class="w-5 h-5" style="color:var(--brand)" />
          </div>
          <div>
            <p class="action-title">Ver mesas</p>
            <p class="action-desc">Gestionar mesas y órdenes</p>
          </div>
        </button>

        <button @click="onNavigate('products')" class="action-card">
          <div class="action-icon">
            <Package class="w-5 h-5" style="color:var(--brand)" />
          </div>
          <div>
            <p class="action-title">Productos</p>
            <p class="action-desc">Administrar menú y precios</p>
          </div>
        </button>

        <button @click="onNavigate('cashier')" class="action-card">
          <div class="action-icon">
            <Wallet class="w-5 h-5" style="color:var(--brand)" />
          </div>
          <div>
            <p class="action-title">Caja</p>
            <p class="action-desc">Ver ventas y transacciones</p>
          </div>
        </button>

        <button @click="onNavigate('inventory')" class="action-card">
          <div class="action-icon">
            <ShoppingBag class="w-5 h-5" style="color:var(--brand)" />
          </div>
          <div>
            <p class="action-title">Inventario</p>
            <p class="action-desc">Control de existencias</p>
          </div>
        </button>
      </div>
    </div>

    <!-- Bottom two columns -->
    <div class="grid grid-cols-2 gap-6">

      <!-- Recent Orders -->
      <div class="panel">
        <h3 class="panel-title mb-5">Órdenes recientes</h3>

        <div>
          <div
            v-for="order in recentOrders"
            :key="order.id"
            class="order-row"
          >
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="order-table">{{ order.table }}</span>
                <span class="order-id">{{ order.id }}</span>
              </div>
              <span class="order-time">{{ order.time }}</span>
            </div>
            <span class="order-amount">{{ order.amount }}</span>
          </div>
        </div>

        <button @click="onNavigate('cashier')" class="bottom-btn mt-4">
          Ver todas las órdenes
        </button>
      </div>

      <!-- Low Stock -->
      <div class="panel">
        <div class="flex items-center gap-2 mb-5">
          <AlertTriangle class="w-5 h-5 stock-warn-icon" />
          <h3 class="panel-title">Inventario bajo</h3>
        </div>

        <div>
          <div
            v-for="(item, i) in lowStockItems"
            :key="i"
            class="order-row"
          >
            <div>
              <p class="order-table mb-1">{{ item.name }}</p>
              <span class="stock-badge">Stock bajo</span>
            </div>
            <div class="text-right">
              <p class="stock-number">{{ item.stock }}</p>
              <p class="order-time">{{ item.unit }}</p>
            </div>
          </div>
        </div>

        <button @click="onNavigate('inventory')" class="bottom-btn mt-4">
          Ir a inventario
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* ── Stats ─────────────────────────────────────── */
.stat-card {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 1.5rem;
}
.stat-label {
  font-size: 0.875rem;
  color: var(--color-muted-foreground);
  margin-bottom: 0.375rem;
}
.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-foreground);
  line-height: 1.1;
}

/* ── Section title ──────────────────────────────── */
.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-foreground);
}

/* ── Action cards ───────────────────────────────── */
.action-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 1.25rem;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.15s;
}
.action-card:hover {
  background-color: var(--color-accent);
}
.action-icon {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background-color: var(--brand-light);
  display: flex;
  align-items: center;
  justify-content: center;
}
.action-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-foreground);
  margin-bottom: 0.125rem;
}
.action-desc {
  font-size: 0.875rem;
  color: var(--color-muted-foreground);
}

/* ── Panels ─────────────────────────────────────── */
.panel {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 1.5rem;
}
.panel-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-foreground);
}

/* ── Order rows ─────────────────────────────────── */
.order-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem 0;
  border-bottom: 1px solid var(--color-border);
}
.order-row:last-child {
  border-bottom: none;
}
.order-table {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-foreground);
}
.order-id {
  font-size: 0.8125rem;
  color: var(--color-muted-foreground);
  background-color: var(--color-accent);
  border-radius: 0.375rem;
  padding: 0.125rem 0.5rem;
}
.order-time {
  font-size: 0.8125rem;
  color: var(--color-muted-foreground);
}
.order-amount {
  font-size: 1rem;
  font-weight: 700;
  color: var(--brand);
}

/* ── Stock ──────────────────────────────────────── */
.stock-warn-icon {
  color: var(--status-occupied, #f87171);
}
.stock-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--status-occupied-text, #ef4444);
  background-color: var(--status-occupied-bg, rgba(239,68,68,0.12));
  border-radius: 0.375rem;
  padding: 0.125rem 0.5rem;
}
.stock-number {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-foreground);
  line-height: 1.2;
}

/* ── Bottom button ──────────────────────────────── */
.bottom-btn {
  display: block;
  width: 100%;
  padding: 0.625rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-foreground);
  background: transparent;
  cursor: pointer;
  transition: background-color 0.15s;
  text-align: center;
}
.bottom-btn:hover {
  background-color: var(--color-accent);
}
</style>
