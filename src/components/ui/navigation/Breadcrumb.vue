<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

defineProps<{
  items?: { label: string; href?: string }[]
}>()
</script>

<template>
  <nav aria-label="breadcrumb" data-slot="breadcrumb">
    <ol class="breadcrumb-list">
      <template v-if="items">
        <li
          v-for="(item, i) in items"
          :key="i"
          class="breadcrumb-item"
        >
          <ChevronRight v-if="i > 0" :size="14" class="breadcrumb-sep" />
          <a v-if="item.href && i < items.length - 1" :href="item.href" class="breadcrumb-link">
            {{ item.label }}
          </a>
          <span v-else :class="['breadcrumb-page', { 'breadcrumb-page--current': i === items.length - 1 }]">
            {{ item.label }}
          </span>
        </li>
      </template>
      <slot v-else />
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  list-style: none;
  padding: 0;
  margin: 0;
}
.breadcrumb-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.breadcrumb-sep { color: rgba(255,255,255,0.3); flex-shrink: 0; }
.breadcrumb-link {
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  transition: color 0.2s;
}
.breadcrumb-link:hover { color: #fff; }
.breadcrumb-page { color: rgba(255,255,255,0.5); }
.breadcrumb-page--current { color: #fff; font-weight: 500; }
</style>
