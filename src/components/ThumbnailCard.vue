<script setup lang="ts">
const props = defineProps<{
  thumbnail: string;
  thumbnailRatio?: number;
  square?: boolean;
  fit?: "fill" | "contain" | "cover" | "none" | "scale-down";
}>();

const { fit = "fill", thumbnailRatio = 0.5 } = props;
</script>

<template>
  <div class="thumbnail-card">
    <img class="thumbnail-card-image" :src="thumbnail" :class="{ square }" />
    <div class="thumbnail-card-content">
      <slot></slot>
    </div>
  </div>
</template>

<style>
:where(.thumbnail-card) {
  gap: 16px;
  padding: 16px;
  border-radius: 10px;
  background: linear-gradient(0deg, #ffffff70, #ffffffbf);
}

:where(.thumbnail-card-image) {
  border-radius: 10px;
}
</style>

<style scoped>
.thumbnail-card {
  display: grid;
  grid-template-columns: v-bind("`${thumbnailRatio}fr 1fr`");
}

.thumbnail-card-image {
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  object-fit: v-bind(fit);
}

.thumbnail-card-image.square {
  aspect-ratio: 1 / 1;
}
</style>
