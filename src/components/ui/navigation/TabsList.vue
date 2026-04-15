<template>
  <div class="tabs-list" role="tablist" data-slot="tabs-list">
    <slot />
  </div>
</template>

<style scoped>
.tabs-list {
  display: inline-flex;
  align-items: center;
  height: 36px;
  border-radius: 10px;
  background: rgba(255,255,255,0.06);
  padding: 3px;
  gap: 2px;
}
</style>
