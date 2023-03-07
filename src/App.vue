<script setup lang="ts">
import { ref } from "vue";

import HeaderPart from "./parts/HeaderPart.vue";
import HomeView from "./views/HomeView.vue";
import WorkspaceView from "./views/WorkspaceView.vue";
import FooterPart from "./parts/FooterPart.vue";

interface State {}

const state = ref<State | null>(null);
</script>

<template>
  <HeaderPart />
  <div id="view">
    <HomeView v-if="state === null" />
    <WorkspaceView v-else :state="state" />
  </div>
  <FooterPart />
</template>

<style>
#view {
  padding: 20px;
}
</style>
