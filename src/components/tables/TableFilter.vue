<script setup>
const props = defineProps({
  activeFilter: String,
  onFilterChange: Function,
  counts: Object
})

const filters = [
  { id: 'todas', label: 'Todas' },
  { id: 'disponible', label: 'Disponibles' },
  { id: 'ocupada', label: 'Ocupadas' },
  { id: 'cuenta-pedida', label: 'Cuenta pedida' }
]
</script>

<template>
  <div class="flex items-center gap-2 flex-wrap mb-6">
    <button
      v-for="filter in filters"
      :key="filter.id"
      @click="onFilterChange(filter.id)"
      :class="[
        'px-4 py-2 rounded-lg transition-all duration-200',
        activeFilter === filter.id
          ? 'text-white border border-transparent'
          : 'bg-card text-muted-foreground hover:text-foreground hover:bg-accent border border-border'
      ]"
      :style="
        activeFilter === filter.id
          ? {
              backgroundColor: 'var(--brand)',
              fontSize: '0.875rem',
              fontWeight: 500
            }
          : {
              fontSize: '0.875rem',
              fontWeight: 500
            }
      "
    >
      {{ filter.label }}
      <span class="ml-2 opacity-70">({{ counts[filter.id] }})</span>
    </button>
  </div>
</template>
