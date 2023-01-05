<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

import viteIcon from "./assets/vite.svg";
</script>

<template>
  <header>
    <h1>Vue SPA</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/workspace">Workspace</RouterLink>
    </nav>
  </header>
  <div id="content">
    <RouterView />
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
