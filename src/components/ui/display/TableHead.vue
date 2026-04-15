<template>
  <th class="table-head" data-slot="table-head">
    <slot />
  </th>
</template>

<style scoped>
.table-head {
  height: 40px;
  padding: 0 8px;
  text-align: left;
  font-weight: 500;
  font-size: 0.875rem;
  color: rgba(255,255,255,0.5);
  white-space: nowrap;
  vertical-align: middle;
}
</style>
