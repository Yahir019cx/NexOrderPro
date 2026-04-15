<script setup lang="ts">
import {
  Home,
  Utensils,
  Package,
  Warehouse,
  Users,
  Wallet,
  Settings,
  MapPin,
  CircleDot
} from 'lucide-vue-next'

const props = defineProps<{
  isExpanded: boolean
  onToggle: () => void
  activeScreen: string
  onNavigate: (screenId: string) => void
}>()

const menuItems = [
  { icon: Home, label: 'Inicio', id: 'home' },
  { icon: CircleDot, label: 'Mesas', id: 'tables' },
  { icon: Package, label: 'Productos', id: 'products' },
  { icon: Warehouse, label: 'Inventario', id: 'inventory' },
  { icon: Users, label: 'Usuarios', id: 'users' },
  { icon: Wallet, label: 'Caja', id: 'cashier' },
  { icon: Settings, label: 'Configuración', id: 'settings' },
]
</script>

<template>
  <aside
    :class="[
      'fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out z-50 flex flex-col',
      isExpanded ? 'w-64' : 'w-20'
    ]"
    :style="{ boxShadow: '4px 0 32px rgba(0, 0, 0, 0.2)' }"
  >
    <!-- Toggle -->
    <button
      @click="onToggle"
      class="w-full h-20 flex items-center justify-center gap-3 border-b border-sidebar-border hover:bg-sidebar-accent transition-colors flex-shrink-0"
    >
      <Utensils class="w-7 h-7" :stroke-width="2" />
      <span
        v-if="isExpanded"
        class="font-semibold tracking-tight"
        style="font-size: 1.125rem"
      >
        NexOrder Pro
      </span>
    </button>

    <!-- Nav -->
    <nav class="px-3 py-6 space-y-2 flex-1 overflow-y-auto">
      <button
        v-for="item in menuItems"
        :key="item.id"
        @click="onNavigate(item.id)"
        :class="[
          'w-full flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all duration-200',
          activeScreen === item.id
            ? 'bg-sidebar-primary text-sidebar-primary-foreground'
            : 'text-sidebar-foreground/70',
          !isExpanded ? 'justify-center' : ''
        ]"
      >
        <component :is="item.icon" class="w-5 h-5 flex-shrink-0" :stroke-width="2" />
        <span
          v-if="isExpanded"
          class="font-medium"
          style="font-size: 0.9375rem"
        >
          {{ item.label }}
        </span>
      </button>
    </nav>

    <!-- Footer -->
    <div
      v-if="isExpanded"
      class="px-4 py-5 border-t border-sidebar-border bg-sidebar/50 flex-shrink-0"
    >
      <div class="space-y-2">
        <h4
          class="text-sidebar-foreground"
          style="font-size: 0.875rem; font-weight: 600"
        >
          La Santa Bar
        </h4>
        <div class="flex items-start gap-2 text-sidebar-foreground/50">
          <MapPin class="w-3.5 h-3.5 mt-0.5 flex-shrink-0" :stroke-width="2" />
          <p style="font-size: 0.75rem; line-height: 1.4">
            Av. Alejandro de la cruz Saucedo
          </p>
        </div>
      </div>
    </div>
  </aside>
</template>
