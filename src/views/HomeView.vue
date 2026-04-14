<script setup>
import { useSidebarStore } from '@/stores/sidebar'

const sidebar = useSidebarStore()
</script>

<template>
  <v-main class="home-bg">
    <div class="home-content" :class="{ expanded: sidebar.isExpanded }">
      <!-- content -->
    </div>
  </v-main>
</template>

<style scoped>
.home-bg {
  min-height: 100vh;
  background-color: #0f0f0f;
}

.home-content {
  margin-left: 80px;
  padding-top: 64px;
  min-height: 100vh;
  transition: margin-left 0.3s ease-in-out;
}

.home-content.expanded {
  margin-left: 256px;
}
</style>
