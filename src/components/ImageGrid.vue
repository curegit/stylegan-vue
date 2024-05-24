<script setup lang="ts">
import { ref, watch } from "vue";

import SelectionItem from "../components/SelectionItem.vue";

defineProps<{
  key: string;
  check: boolean;
}>();
</script>

<template>
  <div>
    <div>
      <SelectionItem v-for="(i, key) in state.data" :key="key" :initial="false">
        <img :src="dataurl(i.data, i.mime)" :width="i.width" :height="i.height"
      /></SelectionItem>
    </div>
  </div>
</template>

<style>
#view {
  padding: 20px;
}
</style>
