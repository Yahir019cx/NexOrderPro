<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import AppFooter from '@/components/AppFooter.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTopBar from '@/components/AppTopBar.vue'

const route = useRoute()
const isLogin = computed(() => route.name === 'login')
</script>

<template>
  <v-app>
    <AppSidebar v-if="!isLogin" />
    <AppTopBar v-if="!isLogin" />
    <RouterView />
    <AppFooter />
  </v-app>
</template>
