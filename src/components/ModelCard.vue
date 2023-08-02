<script setup lang="ts">
defineProps<{
  name: string;
  description: string;
  width: number;
  height: number;
}>();
</script>

<template>
  <div class="card">
    <div class="name">{{ name }}</div>
    <div class="description">{{ description }} ({{ width }}x{{ height }})</div>
  </div>
</template>
