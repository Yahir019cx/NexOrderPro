<script setup>
import {
  Home,
  GalleryHorizontal,
  Package,
  Warehouse,
  Users,
  Wallet,
  Settings,
  Utensils,
  MapPin,
} from 'lucide-vue-next'
import { useSidebarStore } from '@/stores/sidebar'

const sidebar = useSidebarStore()

const menuItems = [
  { icon: Home,      label: 'Inicio',        id: 'home'      },
  { icon: GalleryHorizontal, label: 'Mesas',  id: 'tables'    },
  { icon: Package,   label: 'Productos',     id: 'products'  },
  { icon: Warehouse, label: 'Inventario',    id: 'inventory' },
  { icon: Users,     label: 'Usuarios',      id: 'users'     },
  { icon: Wallet,    label: 'Caja',          id: 'cashier'   },
  { icon: Settings,  label: 'Configuración', id: 'settings'  },
]
</script>

<template>
  <aside class="sidebar" :class="{ expanded: sidebar.isExpanded }">
    <!-- Logo / Toggle -->
    <button class="sidebar-logo" @click="sidebar.toggle">
      <Utensils :size="28" :stroke-width="2" />
      <span v-if="sidebar.isExpanded" class="sidebar-logo-text">NexOrder Pro</span>
    </button>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <button
        v-for="item in menuItems"
        :key="item.id"
        class="nav-item"
        :class="{ active: sidebar.activeScreen === item.id, collapsed: !sidebar.isExpanded }"
        @click="sidebar.navigate(item.id)"
      >
        <component :is="item.icon" :size="20" :stroke-width="2" class="nav-icon" />
        <span v-if="sidebar.isExpanded" class="nav-label">{{ item.label }}</span>
      </button>
    </nav>

    <!-- Footer - Business Info -->
    <div v-if="sidebar.isExpanded" class="sidebar-footer">
      <h4 class="footer-name">La Santa Bar</h4>
      <div class="footer-address">
        <MapPin :size="14" :stroke-width="2" class="footer-icon" />
        <p class="footer-text">Av. Alejandro de la cruz Saucedo</p>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 80px;
  background-color: #161616;
  color: #fff;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease-in-out;
  z-index: 50;
  box-shadow: 4px 0 32px rgba(0, 0, 0, 0.2);
}

.sidebar.expanded {
  width: 256px;
}

.sidebar-logo {
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: none;
  background: none;
  cursor: pointer;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
  transition: background-color 0.2s;
}

.sidebar-logo:hover {
  background-color: rgba(255, 255, 255, 0.04);
}

.sidebar-logo-text {
  font-family: 'Outfit', sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.sidebar-nav {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  overflow-y: auto;
}

.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: none;
  background: none;
  border-radius: 8px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.2s;
  white-space: nowrap;
}

.nav-item.collapsed {
  justify-content: center;
}

.nav-item:hover:not(.active) {
  background-color: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.nav-item.active {
  background-color: #a38162;
  color: #fff;
}

.nav-icon {
  flex-shrink: 0;
}

.nav-label {
  font-size: 0.9375rem;
  font-weight: 500;
}

.sidebar-footer {
  padding: 20px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

.footer-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 8px;
}

.footer-address {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  color: rgba(255, 255, 255, 0.5);
}

.footer-icon {
  margin-top: 2px;
  flex-shrink: 0;
}

.footer-text {
  font-size: 0.75rem;
  line-height: 1.4;
}
</style>
