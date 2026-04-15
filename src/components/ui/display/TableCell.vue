<template>
  <td class="table-cell" data-slot="table-cell">
    <slot />
  </td>
</template>

<style scoped>
.table-cell {
  padding: 10px 8px;
  vertical-align: middle;
  white-space: nowrap;
  color: rgba(255,255,255,0.85);
}
</style>
