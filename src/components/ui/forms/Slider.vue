<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: number
    min?: number
    max?: number
    step?: number
    disabled?: boolean
  }>(),
  { min: 0, max: 100, step: 1 },
)

defineEmits<{ 'update:modelValue': [value: number] }>()

function onInput(e: Event) {
  const val = Number((e.target as HTMLInputElement).value)
  emit('update:modelValue', val)
}

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()
</script>

<template>
  <div class="slider-wrap" data-slot="slider">
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue ?? min"
      :disabled="disabled"
      class="slider"
      @input="onInput"
    />
  </div>
</template>

<style scoped>
.slider-wrap { display: flex; align-items: center; width: 100%; }
.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 99px;
  background: rgba(255,255,255,0.1);
  outline: none;
  cursor: pointer;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #a38162;
  cursor: pointer;
  border: 2px solid #a38162;
  box-shadow: 0 0 0 0 rgba(163,129,98,0.3);
  transition: box-shadow 0.2s;
}
.slider::-webkit-slider-thumb:hover { box-shadow: 0 0 0 4px rgba(163,129,98,0.25); }
.slider:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
