<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { X, Printer } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  onClose: Function,
  tableName: String,
  items: Array,
  date: String,
  time: String,
  onReprint: Function
})

const subtotal = computed(() =>
  props.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

const total = computed(() => subtotal.value)

const handleEscape = (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    props.onClose()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <!-- Overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
    style="animation: fadeIn 0.2s ease-out"
    @click="onClose"
  />

  <!-- Panel -->
  <div
    :class="[
      'fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-card border-l border-border z-[95] transition-transform duration-300 ease-out flex flex-col',
      isOpen ? 'translate-x-0' : 'translate-x-full'
    ]"
    :style="{ boxShadow: '-8px 0 32px rgba(0,0,0,0.3)' }"
  >
    <!-- Header -->
    <div class="flex-shrink-0 px-6 py-5 border-b border-border bg-card/50">
      <div class="flex items-start justify-between mb-3">
        <h2
          class="text-foreground"
          style="font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em;"
        >
          {{ tableName }}
        </h2>
        <button
          @click="onClose"
          class="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-accent -mt-1"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="flex items-center gap-3">
        <div
          class="inline-flex items-center px-2.5 py-1 rounded-md"
          style="background-color: var(--status-available-bg); color: var(--status-available-text);"
        >
          <span style="font-size: 0.75rem; font-weight: 600;">Cerrada</span>
        </div>
        <div class="flex items-center gap-2 text-muted-foreground">
          <span style="font-size: 0.875rem;">{{ date }}</span>
          <span style="font-size: 0.875rem;">•</span>
          <span style="font-size: 0.875rem;">{{ time }}</span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto px-6 py-6">
      <div class="mb-6">
        <h3
          class="text-foreground mb-4 uppercase tracking-wider"
          style="font-size: 0.75rem; font-weight: 700; opacity: 0.7;"
        >
          Productos
        </h3>

        <div class="space-y-3">
          <div
            v-for="item in items"
            :key="item.id"
            class="flex items-start justify-between py-2 border-b border-border/50"
          >
            <div class="flex-1">
              <div class="flex items-baseline gap-2">
                <span class="text-foreground" style="font-size: 0.9375rem; font-weight: 500;">
                  {{ item.name }}
                </span>
                <span class="text-muted-foreground" style="font-size: 0.875rem;">
                  x{{ item.quantity }}
                </span>
              </div>
            </div>
            <span class="text-foreground ml-4" style="font-size: 0.9375rem; font-weight: 600;">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </span>
          </div>
        </div>
      </div>

      <div class="border-t-2 border-border pt-4 space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-muted-foreground" style="font-size: 0.9375rem;">
            Subtotal
          </span>
          <span class="text-foreground" style="font-size: 0.9375rem; font-weight: 500;">
            ${{ subtotal.toFixed(2) }}
          </span>
        </div>
        <div class="flex items-center justify-between pt-2 border-t border-border">
          <span class="text-foreground" style="font-size: 1.125rem; font-weight: 700;">
            Total
          </span>
          <span
            class="text-foreground"
            style="font-size: 1.25rem; font-weight: 700; color: var(--brand);"
          >
            ${{ total.toFixed(2) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex-shrink-0 px-6 py-5 border-t border-border bg-card/50">
      <button
        @click="onReprint"
        class="w-full px-4 py-3 rounded-lg text-white transition-all hover:opacity-90 flex items-center justify-center gap-2"
        style="font-size: 0.9375rem; font-weight: 500; background-color: var(--brand);"
      >
        <Printer class="w-4 h-4" />
        Reimprimir ticket
      </button>
    </div>
  </div>


</template>

<style>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
