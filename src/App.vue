<script setup lang="ts">
import { ref } from "vue";

import HeaderPart from "./parts/HeaderPart.vue";
import HomeView from "./views/HomeView.vue";
import WorkspaceView from "./views/WorkspaceView.vue";
import FooterPart from "./parts/FooterPart.vue";

const state = ref<WorkspaceState | null>(null);

function update(s: WorkspaceState) {
  state.value = s;
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
    <HomeView v-if="state === null" :selector="select" :updater="update" />
    <WorkspaceView v-else :state="state" :updater="update" />
  </div>
  <FooterPart />
</template>

<style>
#view {
  padding: 20px;
}
</style>
