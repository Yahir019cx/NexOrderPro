<script setup></script>

<template>
  <div class="branding-panel">
    <div class="branding-content">
      <h1 class="branding-title">NexOrder Pro</h1>
      <p class="branding-subtitle">Sistema de gestión para restaurantes</p>
    </div>
  </div>
</template>

<style scoped>
.branding-panel {
  padding: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, rgba(163, 129, 98, 0.1) 0%, rgba(163, 129, 98, 0.05) 100%);
}

.branding-content {
  text-align: center;
  position: relative;
}

.branding-title {
  font-family: 'Outfit', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #fff;
  margin-bottom: 16px;
}

.branding-subtitle {
  font-size: 1.125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
}
</style>
