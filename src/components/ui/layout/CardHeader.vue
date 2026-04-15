<template>
  <div class="card-header" data-slot="card-header">
    <slot />
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 24px 24px 0;
}
</style>
