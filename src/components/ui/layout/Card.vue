<script setup lang="ts">
defineProps<{ class?: string }>()
</script>

<!--
  Uso con slots nombrados:
  <Card>
    <template #header>
      <CardTitle>Título</CardTitle>
      <CardDescription>Descripción</CardDescription>
    </template>
    Contenido principal
    <template #footer>
      <Button>Acción</Button>
    </template>
  </Card>

  O usando los sub-componentes CardHeader, CardContent, CardFooter por separado.
-->

<template>
  <div class="card" data-slot="card">
    <slot />
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.08);
  background: #1a1a1a;
  overflow: hidden;
}
</style>
