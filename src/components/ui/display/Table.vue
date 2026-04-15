<!--
  Uso:
  <Table>
    <template #header>
      <TableRow><TableHead>Nombre</TableHead></TableRow>
    </template>
    <template #body>
      <TableRow v-for="item in items" :key="item.id">
        <TableCell>{{ item.name }}</TableCell>
      </TableRow>
    </template>
  </Table>
-->
<template>
  <div class="table-wrap" data-slot="table-container">
    <table class="table" data-slot="table">
      <thead v-if="$slots.header" class="table-header" data-slot="table-header">
        <slot name="header" />
      </thead>
      <tbody class="table-body" data-slot="table-body">
        <slot name="body" />
        <slot />
      </tbody>
      <tfoot v-if="$slots.footer" class="table-footer" data-slot="table-footer">
        <slot name="footer" />
      </tfoot>
      <caption v-if="$slots.caption" class="table-caption" data-slot="table-caption">
        <slot name="caption" />
      </caption>
    </table>
  </div>
</template>

<style scoped>
.table-wrap { position: relative; width: 100%; overflow-x: auto; }
.table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
.table-header :deep(tr) { border-bottom: 1px solid rgba(255,255,255,0.08); }
.table-body :deep(tr:last-child) { border-bottom: none; }
.table-footer {
  background: rgba(255,255,255,0.03);
  border-top: 1px solid rgba(255,255,255,0.08);
  font-weight: 500;
}
.table-caption { color: rgba(255,255,255,0.4); margin-top: 16px; font-size: 0.875rem; caption-side: bottom; }
</style>
