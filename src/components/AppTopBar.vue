<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Bell, User, LogOut } from 'lucide-vue-next'
import { useSidebarStore } from '@/stores/sidebar'

const router = useRouter()
const sidebar = useSidebarStore()

const moduleNames = {
  home:      'Inicio',
  tables:    'Gestión de Mesas',
  products:  'Productos',
  inventory: 'Inventario',
  users:     'Usuarios',
  cashier:   'Caja',
  settings:  'Configuración',
}

const moduleName = computed(() => moduleNames[sidebar.activeScreen] ?? 'Inicio')

const isUserMenuOpen       = ref(false)
const isNotificationsOpen  = ref(false)

const notifications = ref([
  { id: 1, title: 'Nueva orden',       message: 'Mesa 5 ha solicitado la cuenta',  time: 'Hace 5 min',  isRead: false },
  { id: 2, title: 'Inventario bajo',   message: 'Cerveza Corona tiene stock bajo', time: 'Hace 15 min', isRead: false },
  { id: 3, title: 'Orden completada',  message: 'Mesa 3 ha cerrado su cuenta',     time: 'Hace 30 min', isRead: false },
])

const unreadCount = computed(() => notifications.value.filter(n => !n.isRead).length)

function handleNotificationClick() {
  isNotificationsOpen.value = !isNotificationsOpen.value
  if (isNotificationsOpen.value) {
    notifications.value = notifications.value.map(n => ({ ...n, isRead: true }))
  }
}

function handleLogout() {
  isUserMenuOpen.value = false
  router.push('/')
}

const userMenuRef        = ref(null)
const notificationsRef   = ref(null)

function handleClickOutside(event) {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    isUserMenuOpen.value = false
  }
  if (notificationsRef.value && !notificationsRef.value.contains(event.target)) {
    isNotificationsOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<template>
  <header class="topbar" :style="{ left: sidebar.isExpanded ? '16rem' : '5rem' }">
    <div class="topbar-inner">

      <!-- Left: Business & Module -->
      <div class="topbar-left">
        <h1 class="topbar-business">La Santa Bar</h1>
        <span class="topbar-dot" />
        <span class="topbar-module">{{ moduleName }}</span>
      </div>

      <!-- Right: Notifications & User -->
      <div class="topbar-right">

        <!-- Notifications -->
        <div class="dropdown-wrap" ref="notificationsRef">
          <button class="icon-btn" @click="handleNotificationClick">
            <Bell :size="20" :stroke-width="2" />
            <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
          </button>

          <div v-if="isNotificationsOpen" class="dropdown notif-dropdown">
            <div class="dropdown-header">
              <h3 class="dropdown-title">Notificaciones</h3>
            </div>
            <div class="notif-list">
              <div
                v-for="n in notifications"
                :key="n.id"
                class="notif-item"
              >
                <div class="notif-top">
                  <h4 class="notif-name">{{ n.title }}</h4>
                  <span class="notif-time">{{ n.time }}</span>
                </div>
                <p class="notif-msg">{{ n.message }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- User Menu -->
        <div class="dropdown-wrap" ref="userMenuRef">
          <button class="user-btn" @click="isUserMenuOpen = !isUserMenuOpen">
            <div class="user-avatar">
              <User :size="14" :stroke-width="2" class="user-avatar-icon" />
            </div>
            <span class="user-name">Admin</span>
          </button>

          <div v-if="isUserMenuOpen" class="dropdown user-dropdown">
            <button class="logout-btn" @click="handleLogout">
              <LogOut :size="16" :stroke-width="2" class="logout-icon" />
              <span class="logout-label">Cerrar sesión</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  position: fixed;
  top: 0;
  right: 0;
  height: 64px;
  background: rgba(22, 22, 22, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 40;
  display: flex;
  align-items: center;
  padding: 0 32px;
  transition: left 0.3s ease-in-out;
}

.topbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.topbar-business {
  font-size: 1.125rem;
  font-weight: 600;
  color: #fff;
}

.topbar-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
}

.topbar-module {
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Icon button (bell) */
.icon-btn {
  position: relative;
  padding: 8px;
  border-radius: 8px;
  border: none;
  background: none;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
}

.icon-btn:hover {
  background: rgba(255, 255, 255, 0.06);
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #e85d4a;
  color: #fff;
  font-size: 0.6875rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* User button */
.user-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 14px;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.06);
  cursor: pointer;
  color: #fff;
  transition: background-color 0.2s;
}

.user-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(163, 129, 98, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar-icon {
  color: #a38162;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 500;
}

/* Dropdowns */
.dropdown-wrap {
  position: relative;
}

.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #1e1e1e;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  z-index: 100;
}

.notif-dropdown {
  width: 320px;
}

.dropdown-header {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.dropdown-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #fff;
}

.notif-list {
  max-height: 384px;
  overflow-y: auto;
}

.notif-item {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  cursor: pointer;
  transition: background-color 0.2s;
}

.notif-item:last-child {
  border-bottom: none;
}

.notif-item:hover {
  background: rgba(255, 255, 255, 0.04);
}

.notif-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
}

.notif-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
}

.notif-time {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
}

.notif-msg {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.5);
}

/* User dropdown */
.user-dropdown {
  width: 192px;
}

.logout-btn {
  width: 100%;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.04);
}

.logout-icon {
  color: rgba(255, 255, 255, 0.5);
}

.logout-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
}
</style>
