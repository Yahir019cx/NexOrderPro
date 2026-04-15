<script setup>
import { ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'

const props = defineProps({
  onLogin: Function
})

const username = ref('')
const password = ref('')
const showPassword = ref(false)

const handleSubmit = (e) => {
  e.preventDefault()
  if (username.value && password.value) {
    props.onLogin()
  }
}
</script>

<template>
  <div class="min-h-screen bg-background flex items-center justify-center px-4">
    <div class="w-full max-w-5xl bg-card rounded-2xl shadow-2xl overflow-hidden border border-border">
      <div class="grid grid-cols-1 lg:grid-cols-2">

        <!-- Left -->
        <div
          class="p-12 flex flex-col items-center justify-center relative"
          style="background: linear-gradient(135deg, rgba(163,129,98,0.1) 0%, rgba(163,129,98,0.05) 100%)"
        >
          <div class="text-center">
            <h1 class="text-foreground mb-4" style="font-size:3rem; font-weight:700;">
              NexOrder Pro
            </h1>
            <p class="text-muted-foreground" style="font-size:1.125rem;">
              Sistema de gestión para restaurantes
            </p>
          </div>

          <div
            class="absolute inset-0 opacity-5"
            style="background-image:url(&quot;data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E&quot;)"
          />
        </div>

        <!-- Right -->
        <div class="p-12 flex flex-col justify-center">
          <div class="mb-8">
            <h2 class="text-foreground mb-2" style="font-size:1.75rem; font-weight:700;">
              Iniciar sesión
            </h2>
            <p class="text-muted-foreground">
              Ingresa tus credenciales para acceder
            </p>
          </div>

          <form @submit="handleSubmit" class="space-y-5">

            <!-- Usuario -->
            <div>
              <label class="block mb-2">Usuario</label>
              <input
                v-model="username"
                type="text"
                placeholder="Ingresa tu usuario"
                class="w-full px-4 py-3 border border-border rounded-lg"
                required
              />
            </div>

            <!-- Password -->
            <div>
              <label class="block mb-2">Contraseña</label>
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  placeholder="Ingresa tu contraseña"
                  class="w-full px-4 py-3 border border-border rounded-lg pr-12"
                  required
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <EyeOff v-if="showPassword" class="w-5 h-5" />
                  <Eye v-else class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="w-full px-4 py-3 text-white rounded-lg mt-6"
              style="background:var(--brand)"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>

    <footer class="fixed bottom-0 w-full text-center py-2">
      <p class="text-muted-foreground text-xs">
        NexDevCode © 2026
      </p>
    </footer>
  </div>
</template>
