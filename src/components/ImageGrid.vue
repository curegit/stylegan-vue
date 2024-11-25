<script setup lang="ts">
import { ref } from "vue";

import SelectionItem from "../components/SelectionItem.vue";

const selecteds = ref<{ [key: string]: boolean }>({});

function selecs(key: string) {
  return key in selecteds.value;
}
</script>

<template>
  <div>
    {{ selecteds }}
    <div>
      <div class="tab-contents">
        <div v-for="(_, key) in $slots" :key="key">
          <SelectionItem v-model="selecteds[key]">
            <slot :name="key"></slot>
          </SelectionItem>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#view {
  padding: 20px;
}
</style>
