<script setup lang="ts">
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
  maxVisible?: number
}>()

const emit = defineEmits<{ 'update:currentPage': [page: number] }>()

const maxVisible = computed(() => props.maxVisible ?? 5)

const pages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  const max = maxVisible.value
  if (total <= max) return Array.from({ length: total }, (_, i) => i + 1)

  const half = Math.floor(max / 2)
  let start = Math.max(1, current - half)
  let end = Math.min(total, start + max - 1)
  if (end - start < max - 1) start = Math.max(1, end - max + 1)

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

const showStartEllipsis = computed(() => pages.value[0] > 2)
const showEndEllipsis = computed(() => pages.value[pages.value.length - 1] < props.totalPages - 1)
</script>

<template>
  <nav role="navigation" aria-label="pagination" class="pagination" data-slot="pagination">
    <ul class="pagination-list">
      <!-- Prev -->
      <li>
        <button
          class="page-btn page-btn--nav"
          :disabled="currentPage <= 1"
          aria-label="Página anterior"
          @click="emit('update:currentPage', currentPage - 1)"
        >
          <ChevronLeft :size="16" />
        </button>
      </li>

      <!-- First page -->
      <li v-if="pages[0] > 1">
        <button class="page-btn" :class="{ 'page-btn--active': currentPage === 1 }" @click="emit('update:currentPage', 1)">1</button>
      </li>

      <!-- Start ellipsis -->
      <li v-if="showStartEllipsis">
        <span class="page-ellipsis"><MoreHorizontal :size="16" /></span>
      </li>

      <!-- Page buttons -->
      <li v-for="page in pages" :key="page">
        <button
          class="page-btn"
          :class="{ 'page-btn--active': currentPage === page }"
          :aria-current="currentPage === page ? 'page' : undefined"
          @click="emit('update:currentPage', page)"
        >
          {{ page }}
        </button>
      </li>

      <!-- End ellipsis -->
      <li v-if="showEndEllipsis">
        <span class="page-ellipsis"><MoreHorizontal :size="16" /></span>
      </li>

      <!-- Last page -->
      <li v-if="pages[pages.length - 1] < totalPages">
        <button
          class="page-btn"
          :class="{ 'page-btn--active': currentPage === totalPages }"
          @click="emit('update:currentPage', totalPages)"
        >
          {{ totalPages }}
        </button>
      </li>

      <!-- Next -->
      <li>
        <button
          class="page-btn page-btn--nav"
          :disabled="currentPage >= totalPages"
          aria-label="Página siguiente"
          @click="emit('update:currentPage', currentPage + 1)"
        >
          <ChevronRight :size="16" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.pagination { display: flex; justify-content: center; width: 100%; }
.pagination-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0 4px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: transparent;
  color: rgba(255,255,255,0.7);
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  font-family: inherit;
  outline: none;
}
.page-btn:hover:not(:disabled) { background: rgba(255,255,255,0.07); color: #fff; }
.page-btn--active {
  border-color: rgba(255,255,255,0.15);
  color: #fff;
  font-weight: 600;
}
.page-btn--nav { color: rgba(255,255,255,0.5); }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.page-ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: rgba(255,255,255,0.4);
}
</style>
