<template>
  <p class="card-description" data-slot="card-description">
    <slot />
  </p>
</template>

<style scoped>
.card-description {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.5);
}
</style>
