<script setup lang="ts">
import { ref } from "vue";

import viteIcon from "./assets/vite.svg";
import HomeView from "./views/HomeView.vue";
import WorkspaceView from "./views/WorkspaceView.vue";

const models = ref([] as string[]);

setTimeout(() => {
  models.value.push("afhq");
}, 5000);
</script>

<template>
  <header v-if="models.length > 0">
    <h1>Vue SPA</h1>
    <nav></nav>
  </header>
  <div id="content">
    <HomeView> </HomeView>
    <WorkspaceView />
  </div>
  <footer>
    <img :src="viteIcon" />
  </footer>
</template>

<style>
#content {
  padding: 20px;
}
</style>
