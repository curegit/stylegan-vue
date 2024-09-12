<script setup lang="ts">
import { ref, watch } from "vue";

import SelectionItem from "../components/SelectionItem.vue";

defineProps<{
  key2: string;
  check: boolean;
  src: string;
}>();
</script>

<template>
  <div>
    <div>
      <!--
      <SelectionItem v-for="(i, key) in state.data" :key="key" :initial="false"> <img :src="src" :width="i.width" :height="i.height" /></SelectionItem>
      -->
    </div>
  </div>
</template>

<style>
#view {
  padding: 20px;
}
</style>
