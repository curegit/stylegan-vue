<script setup lang="ts">
defineProps<{
  model: Model;
}>();
</script>

<template>
  <div class="card">
    <div class="name">{{ model.name }}</div>
    <div class="description">{{ model.description }} ({{ model.width }}x{{ model.height }})</div>
  </div>
</template>
