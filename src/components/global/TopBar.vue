<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { User, Bell, LogOut } from 'lucide-vue-next'

const props = defineProps({
  isSidebarExpanded: Boolean,
  moduleName: {
    type: String,
    default: 'Gestión de Mesas'
  },
  onLogout: Function
})

const isUserMenuOpen = ref(false)
const isNotificationsOpen = ref(false)

const notifications = ref([
  {
    id: 1,
    title: 'Nueva orden',
    message: 'Mesa 5 ha solicitado la cuenta',
    time: 'Hace 5 min',
    isRead: false
  },
  {
    id: 2,
    title: 'Inventario bajo',
    message: 'Cerveza Corona tiene stock bajo',
    time: 'Hace 15 min',
    isRead: false
  },
  {
    id: 3,
    title: 'Orden completada',
    message: 'Mesa 3 ha cerrado su cuenta',
    time: 'Hace 30 min',
    isRead: false
  }
])

const userMenuRef = ref(null)
const notificationsRef = ref(null)

const unreadCount = computed(() =>
  notifications.value.filter(n => !n.isRead).length
)

const handleClickOutside = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    isUserMenuOpen.value = false
  }
  if (notificationsRef.value && !notificationsRef.value.contains(event.target)) {
    isNotificationsOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

const handleNotificationClick = () => {
  isNotificationsOpen.value = !isNotificationsOpen.value
  if (!isNotificationsOpen.value) return
  notifications.value = notifications.value.map(n => ({ ...n, isRead: true }))
}
</script>

<template>
  <header
    class="fixed top-0 right-0 h-16 bg-card/80 backdrop-blur-md border-b border-border z-40 flex items-center px-8 transition-all duration-300"
    :style="{ left: isSidebarExpanded ? '16rem' : '5rem' }"
  >
    <div class="flex items-center justify-between w-full">
      <div class="flex items-center gap-3">
        <h1 class="text-foreground" style="font-size: 1.125rem; font-weight: 600;">
          La Santa Bar
        </h1>
        <div class="w-1 h-1 rounded-full bg-muted-foreground/40" style="margin: 0 0.25rem;" />
        <span class="text-muted-foreground" style="font-size: 1rem; font-weight: 500;">
          {{ moduleName }}
        </span>
      </div>

      <div class="flex items-center gap-3">
        <!-- Notifications -->
        <div class="relative" ref="notificationsRef">
          <button
            @click="handleNotificationClick"
            class="relative p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <Bell class="w-5 h-5 text-foreground" />
            <div
              v-if="unreadCount > 0"
              class="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white"
              style="font-size: 0.6875rem; font-weight: 700; background-color: var(--status-requested);"
            >
              {{ unreadCount }}
            </div>
          </button>

          <div
            v-if="isNotificationsOpen"
            class="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-xl overflow-hidden"
            style="top: 100%;"
          >
            <div class="px-4 py-3 border-b border-border">
              <h3 class="text-foreground" style="font-size: 0.9375rem; font-weight: 600;">
                Notificaciones
              </h3>
            </div>

            <div class="max-h-96 overflow-y-auto">
              <div v-if="notifications.length > 0">
                <div
                  v-for="notification in notifications"
                  :key="notification.id"
                  class="px-4 py-3 border-b border-border last:border-b-0 hover:bg-accent transition-colors cursor-pointer"
                >
                  <div class="flex justify-between items-start mb-1">
                    <h4 class="text-foreground" style="font-size: 0.875rem; font-weight: 600;">
                      {{ notification.title }}
                    </h4>
                    <span class="text-muted-foreground" style="font-size: 0.75rem;">
                      {{ notification.time }}
                    </span>
                  </div>
                  <p class="text-muted-foreground" style="font-size: 0.8125rem;">
                    {{ notification.message }}
                  </p>
                </div>
              </div>

              <div v-else class="px-4 py-8 text-center">
                <p class="text-muted-foreground" style="font-size: 0.875rem;">
                  No hay notificaciones
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- User Menu -->
        <div class="relative" ref="userMenuRef">
          <button
            @click="isUserMenuOpen = !isUserMenuOpen"
            class="flex items-center gap-3 px-3.5 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div
              class="w-7 h-7 rounded-full flex items-center justify-center"
              style="background-color: var(--brand-light)"
            >
              <User class="w-3.5 h-3.5" style="color: var(--brand)" />
            </div>
            <span class="text-foreground" style="font-size: 0.875rem; font-weight: 500;">
              Admin
            </span>
          </button>

          <div
            v-if="isUserMenuOpen"
            class="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-xl overflow-hidden"
            style="top: 100%;"
          >
            <button
              @click="() => { isUserMenuOpen = false; onLogout && onLogout() }"
              class="w-full px-4 py-3 flex items-center gap-3 hover:bg-accent transition-colors text-left"
            >
              <LogOut class="w-4 h-4 text-muted-foreground" />
              <span class="text-foreground" style="font-size: 0.875rem; font-weight: 500;">
                Cerrar sesión
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
