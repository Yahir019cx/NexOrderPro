<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { X, Eye, EyeOff, RefreshCw } from 'lucide-vue-next'

interface User {
  id?: number
  name: string
  role: 'Admin' | 'Mesero'
  password: string
}

const props = defineProps<{
  isOpen: boolean
  onClose: () => void
  onSave: (user: User) => void
  editUser?: { id: number; name: string; role: 'Admin' | 'Mesero' } | null
}>()

const nameInputRef = ref<HTMLInputElement | null>(null)
const showPassword = ref(false)
const password = ref('')

watch(() => props.isOpen, async (val) => {
  if (val) {
    await nextTick()
    setTimeout(() => {
      nameInputRef.value?.focus()
    }, 100)
    password.value = ''
    showPassword.value = false
  }
})

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    props.onClose()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

const generatePassword = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'
  let newPassword = ''
  for (let i = 0; i < 8; i++) {
    newPassword += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  password.value = newPassword
  showPassword.value = true
}

const selectStyle = computed(() => ({
  fontSize: '0.9375rem',
  '--tw-ring-color': 'var(--brand)',
  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23A38162' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
  backgroundPosition: 'right 0.5rem center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '1.5em 1.5em',
  paddingRight: '2.5rem'
}))

const handleSubmit = (e: Event) => {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)

  const name = formData.get('name') as string
  const role = formData.get('role') as 'Admin' | 'Mesero'
  const passwordValue = formData.get('password') as string

  if (name.trim() && role && (passwordValue || props.editUser)) {
    props.onSave({
      ...(props.editUser ? { id: props.editUser.id } : {}),
      name,
      role,
      password: passwordValue,
    })
    form.reset()
    password.value = ''
  }
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-[100] flex items-center justify-center"
    @click="onClose"
  >
    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-black/60 backdrop-blur-sm"
      style="animation: fadeIn 0.2s ease-out"
    />

    <!-- Modal -->
    <div
      class="relative bg-card rounded-2xl border border-border max-w-md w-full mx-4"
      :style="{
        boxShadow: '0 24px 48px rgba(0, 0, 0, 0.4)',
        animation: 'slideUpModal 0.3s ease-out'
      }"
      @click.stop
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-border">
        <h2
          class="text-foreground"
          style="font-size: 1.25rem; font-weight: 600; letter-spacing: -0.01em"
        >
          {{ editUser ? 'Editar usuario' : 'Nuevo usuario' }}
        </h2>
        <button
          @click="onClose"
          class="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-accent"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Form -->
      <form @submit="handleSubmit">
        <div class="px-6 py-6 space-y-5">
          <!-- Name -->
          <div>
            <label
              for="name"
              class="block text-foreground mb-2"
              style="font-size: 0.875rem; font-weight: 500"
            >
              Nombre completo
            </label>
            <input
              ref="nameInputRef"
              type="text"
              id="name"
              name="name"
              placeholder="Ej: Juan Pérez"
              required
              :value="editUser?.name || ''"
              class="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all"
              :style="{
                fontSize: '0.9375rem',
                '--tw-ring-color': 'var(--brand)'
              }"
            />
          </div>

          <!-- Role -->
          <div>
            <label
              for="role"
              class="block text-foreground mb-2"
              style="font-size: 0.875rem; font-weight: 500"
            >
              Rol
            </label>
            <select
              id="role"
              name="role"
              required
              :value="editUser?.role || ''"
              class="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer"
              :style="selectStyle"
            >
              <option value="">Seleccionar rol</option>
              <option value="Admin">Admin</option>
              <option value="Mesero">Mesero</option>
            </select>
          </div>

          <!-- Password -->
          <div>
            <label
              for="password"
              class="block text-foreground mb-2"
              style="font-size: 0.875rem; font-weight: 500"
            >
              Contraseña
              <span v-if="editUser" class="text-muted-foreground">
                (dejar vacío para no cambiar)
              </span>
            </label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                name="password"
                placeholder="Ingresa contraseña"
                :required="!editUser"
                v-model="password"
                class="w-full px-4 py-3 pr-24 bg-input-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all"
                :style="{
                  fontSize: '0.9375rem',
                  '--tw-ring-color': 'var(--brand)'
                }"
              />
              <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  type="button"
                  @click="generatePassword"
                  class="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <RefreshCw class="w-4 h-4" />
                </button>
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <EyeOff v-if="showPassword" class="w-4 h-4" />
                  <Eye v-else class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="px-6 py-5 border-t border-border flex items-center justify-end gap-3">
          <button
            type="button"
            @click="onClose"
            class="px-5 py-2.5 rounded-lg bg-secondary text-foreground hover:bg-accent transition-colors"
            style="font-size: 0.9375rem; font-weight: 500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-5 py-2.5 rounded-lg text-white transition-all hover:opacity-90"
            :style="{
              fontSize: '0.9375rem',
              fontWeight: 500,
              backgroundColor: 'var(--brand)'
            }"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>

  </div>
</template>

<style>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUpModal {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
