<script setup lang="ts">
import { dataurl } from "../utils";

defineProps<{
  model: Model;
}>();
</script>

<template>
  <div :id="model.id" class="card">
    <div class="name">{{ model.name }}</div>
    <img :src="dataurl(model.example, model.mimeType)" />
    <div class="description">{{ model.description }} ({{ model.width }}x{{ model.height }})</div>
  </div>
</template>
