<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import AppFooter from '@/components/global/AppFooter.vue'
import AppSidebar from '@/components/global/AppSidebar.vue'
import AppTopBar from '@/components/global/AppTopBar.vue'

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
