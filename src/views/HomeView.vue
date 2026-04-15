<script setup>
import { useSidebarStore } from '@/stores/sidebar'
import HomeScreen     from '@/components/screens/HomeScreen.vue'
import TablesScreen   from '@/components/screens/TablesScreen.vue'
import ProductsScreen from '@/components/screens/ProductsScreen.vue'
import InventoryScreen from '@/components/screens/InventoryScreen.vue'
import UsersScreen    from '@/components/screens/UsersScreen.vue'
import CashierScreen  from '@/components/screens/CashierScreen.vue'
import SettingsScreen from '@/components/screens/SettingsScreen.vue'

const sidebar = useSidebarStore()
</script>

<template>
  <v-main class="home-bg">
    <div class="home-content" :class="{ expanded: sidebar.isExpanded }">
      <HomeScreen     v-if="sidebar.activeScreen === 'home'"      :onNavigate="val => sidebar.navigate(val)" />
      <TablesScreen   v-if="sidebar.activeScreen === 'tables'" />
      <ProductsScreen v-if="sidebar.activeScreen === 'products'" />
      <InventoryScreen v-if="sidebar.activeScreen === 'inventory'" />
      <UsersScreen    v-if="sidebar.activeScreen === 'users'" />
      <CashierScreen  v-if="sidebar.activeScreen === 'cashier'" />
      <SettingsScreen v-if="sidebar.activeScreen === 'settings'" />
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
  color: #fff;
}

.home-content.expanded {
  margin-left: 256px;
}
</style>
