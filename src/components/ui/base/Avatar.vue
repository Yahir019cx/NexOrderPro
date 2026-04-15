<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  src?: string
  alt?: string
  fallback?: string
}>()

const imgError = ref(false)

function onError() {
  imgError.value = true
}
</script>

<template>
  <div class="avatar" data-slot="avatar">
    <img
      v-if="src && !imgError"
      :src="src"
      :alt="alt ?? ''"
      class="avatar__img"
      data-slot="avatar-image"
      @error="onError"
    />
    <div v-else class="avatar__fallback" data-slot="avatar-fallback">
      <span v-if="fallback">{{ fallback }}</span>
      <slot v-else />
    </div>
  </div>
</template>

<style scoped>
.avatar {
  position: relative;
  display: flex;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 50%;
}
.avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.avatar__fallback {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(163, 129, 98, 0.2);
  color: #a38162;
  font-size: 0.875rem;
  font-weight: 600;
}
</style>
