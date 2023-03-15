<script setup lang="ts">
import { ref } from "vue";

import HeaderPart from "./parts/HeaderPart.vue";
import HomeView from "./views/HomeView.vue";
import WorkspaceView from "./views/WorkspaceView.vue";
import FooterPart from "./parts/FooterPart.vue";

const state = ref<WorkspaceState | null>(null);

function update(f: (a: WorkspaceState) => WorkspaceState) {
  if (state.value !== null) state.value = f(state.value);
}

function select(name: string) {
  state.value = {
    model_id: name,
    data: [],
  };
}
</script>

<template>
  <HeaderPart />
  <div id="view">
    <HomeView v-if="state === null" :selector="select" />
    <WorkspaceView v-else :state="state" :updater="update" />
  </div>
  <FooterPart />
</template>

<style>
#view {
  padding: 20px;
}
</style>
