<script setup lang="ts">
import SelectionItem from "../components/SelectionItem.vue";

const selection = defineModel<{ [key: string]: boolean }>({ required: true, default: () => ({}) });

interface img {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

defineProps<{
  images: { [key: string]: img };
}>();
</script>

<template>
  <div class="image-grid">
    <div v-for="(i, key) in images" :key="key">
      <SelectionItem v-model="selection[key]">
        <img :src="i.src" :width="i.width" :height="i.height" :alt="i.alt" />
      </SelectionItem>
    </div>
    <template v-for="(_, key) in $slots" :key="key">
      <slot :name="key"></slot>
    </template>
  </div>
</template>

<style>
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
</style>
