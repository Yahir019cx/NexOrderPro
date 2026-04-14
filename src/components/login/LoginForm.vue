<script setup>
import { ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'

const emit = defineEmits(['login'])

const username = ref('')
const password = ref('')
const showPassword = ref(false)

function handleSubmit() {
  emit('login')
}
</script>

<template>
  <div class="form-panel">
    <div class="form-header">
      <h2 class="form-title">Iniciar sesión</h2>
      <p class="form-subtitle">Ingresa tus credenciales para acceder</p>
    </div>

    <form class="form-body" @submit.prevent="handleSubmit">
      <div class="field">
        <label class="field-label">Usuario</label>
        <input
          v-model="username"
          type="text"
          class="field-input"
          placeholder="Ingresa tu usuario"
          required
        />
      </div>

      <div class="field">
        <label class="field-label">Contraseña</label>
        <div class="field-wrap">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            class="field-input"
            placeholder="Ingresa tu contraseña"
            required
          />
          <button type="button" class="toggle-btn" @click="showPassword = !showPassword">
            <EyeOff v-if="showPassword" :size="20" :stroke-width="2" />
            <Eye v-else :size="20" :stroke-width="2" />
          </button>
        </div>
      </div>

      <button type="submit" class="submit-btn" style="cursor:pointer">
        Iniciar sesión
      </button>
    </form>
  </div>
</template>

<style scoped>
.form-panel {
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}

.form-header {
  margin-bottom: 32px;
}

.form-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
  margin-bottom: 8px;
}

.form-subtitle {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.5);
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field {
  display: flex;
  flex-direction: column;
}

.field-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  margin-bottom: 8px;
}

.field-wrap {
  position: relative;
}

.field-input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 0.9375rem;
  outline: none;
  transition: all 0.2s;
}

.field-wrap .field-input {
  padding-right: 48px;
}

.field-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.field-input:focus {
  box-shadow: 0 0 0 2px rgba(163, 129, 98, 0.5);
  border-color: transparent;
}

.toggle-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.35);
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.toggle-btn:hover {
  color: #fff;
}

.submit-btn {
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background-color: #a38162;
  color: #fff;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 4px;
  transition: opacity 0.2s;
}

.submit-btn:hover {
  opacity: 0.9;
}
</style>
