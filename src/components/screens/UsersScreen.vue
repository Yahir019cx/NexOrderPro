<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus } from 'lucide-vue-next'
import UserCard from '../users/UserCard.vue'
import AddUserModal from '../users/AddUserModal.vue'

interface User {
  id: number
  name: string
  role: 'Admin' | 'Mesero'
  isActive: boolean
}

const MOCK_USERS: User[] = [
  { id: 1, name: 'Carlos Rodríguez', role: 'Admin', isActive: true },
  { id: 2, name: 'María González', role: 'Mesero', isActive: true },
  { id: 3, name: 'Juan Pérez', role: 'Mesero', isActive: true },
  { id: 4, name: 'Ana Martínez', role: 'Mesero', isActive: true },
  { id: 5, name: 'Luis Hernández', role: 'Mesero', isActive: false },
  { id: 6, name: 'Patricia López', role: 'Admin', isActive: true },
]

const isModalOpen = ref(false)
const editingUser = ref<User | null>(null)
const users = ref<User[]>(MOCK_USERS)

const handleSaveUser = (userData: {
  id?: number
  name: string
  role: 'Admin' | 'Mesero'
  password: string
}) => {
  if (userData.id) {
    users.value = users.value.map(user =>
      user.id === userData.id
        ? { ...user, name: userData.name, role: userData.role }
        : user
    )
  } else {
    const newUser: User = {
      id: Math.max(...users.value.map(u => u.id)) + 1,
      name: userData.name,
      role: userData.role,
      isActive: true,
    }
    users.value = [...users.value, newUser]
  }
  isModalOpen.value = false
  editingUser.value = null
}

const handleEditUser = (user: User) => {
  editingUser.value = user
  isModalOpen.value = true
}

const handleDelete = (id: number) => {
  users.value = users.value.filter(user => user.id !== id)
}

const handleToggleActive = (id: number) => {
  users.value = users.value.map(user =>
    user.id === id ? { ...user, isActive: !user.isActive } : user
  )
}

const admins = computed(() => users.value.filter(u => u.role === 'Admin'))
const meseros = computed(() => users.value.filter(u => u.role === 'Mesero'))
</script>

<template>
  <div class="px-8 py-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-foreground mb-1" style="font-size: 1.75rem; font-weight: 700;">
          Usuarios
        </h2>
        <p class="text-muted-foreground" style="font-size: 0.9375rem;">
          Administra el personal del restaurante
        </p>
      </div>

      <button
        @click="() => { editingUser = null; isModalOpen = true }"
        class="px-4 py-2.5 rounded-lg text-white flex items-center gap-2"
        style="background-color: var(--brand)"
      >
        <Plus class="w-4 h-4" />
        Agregar usuario
      </button>
    </div>

    <!-- Admins -->
    <div class="mb-8">
      <h3 class="text-foreground mb-4 flex items-center gap-2" style="font-size: 1.125rem;">
        Administradores
        <span class="text-muted-foreground">({{ admins.length }})</span>
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <UserCard
          v-for="user in admins"
          :key="user.id"
          :name="user.name"
          :role="user.role"
          :isActive="user.isActive"
          @edit="handleEditUser(user)"
          @delete="handleDelete(user.id)"
          @toggleActive="handleToggleActive(user.id)"
        />
      </div>

      <div v-if="admins.length === 0" class="text-center py-8 bg-card rounded-lg border border-border">
        <p class="text-muted-foreground">No hay administradores</p>
      </div>
    </div>

    <!-- Meseros -->
    <div>
      <h3 class="text-foreground mb-4 flex items-center gap-2" style="font-size: 1.125rem;">
        Meseros
        <span class="text-muted-foreground">({{ meseros.length }})</span>
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <UserCard
          v-for="user in meseros"
          :key="user.id"
          :name="user.name"
          :role="user.role"
          :isActive="user.isActive"
          @edit="handleEditUser(user)"
          @delete="handleDelete(user.id)"
          @toggleActive="handleToggleActive(user.id)"
        />
      </div>

      <div v-if="meseros.length === 0" class="text-center py-8 bg-card rounded-lg border border-border">
        <p class="text-muted-foreground">No hay meseros</p>
      </div>
    </div>

    <!-- Modal -->
    <AddUserModal
      :isOpen="isModalOpen"
      :editUser="editingUser"
      @close="() => { isModalOpen = false; editingUser = null }"
      @save="handleSaveUser"
    />
  </div>
</template>
