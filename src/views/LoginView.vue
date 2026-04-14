<script setup>
import LoginBranding from '@/components/login/LoginBranding.vue'
import LoginForm from '@/components/login/LoginForm.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleLogin() {
  router.push('/dashboard')
}
</script>

<template>
  <v-main class="login-bg">
    <div class="login-center">
      <div class="login-card">
        <div class="login-grid">
          <LoginBranding />
          <LoginForm @login="handleLogin" />
        </div>
      </div>
    </div>
  </v-main>
</template>

<style scoped>
.login-bg {
  min-height: 100vh;
  background-color: #0f0f0f;
}

.login-center {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
}

.login-card {
  width: 100%;
  max-width: 64rem;
  background-color: #161616;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.login-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

@media (max-width: 1023px) {
  .login-grid {
    grid-template-columns: 1fr;
  }
}
</style>
