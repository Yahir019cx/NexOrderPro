<script setup lang="ts">
defineProps<{ selected?: boolean }>()
</script>

<template>
  <tr :class="['table-row', { 'table-row--selected': selected }]" data-slot="table-row">
    <slot />
  </tr>
</template>

<style scoped>
.table-row {
  border-bottom: 1px solid rgba(255,255,255,0.07);
  transition: background 0.15s;
}
.table-row:hover { background: rgba(255,255,255,0.03); }
.table-row--selected { background: rgba(163,129,98,0.08); }
</style>
