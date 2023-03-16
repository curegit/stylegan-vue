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

function reset() {
  state.value = null;
}
</script>

<template>
  <HeaderPart />
  <button @click="reset">Reset</button>
  <div id="view">
    <HomeView v-if="state === null" :selector="select" :updater="update" />
    <Transition :name="'bounce'">
      <WorkspaceView v-if="state !== null" :state="state" :updater="update" />
    </Transition>
  </div>
  <FooterPart />
</template>

<style>
#view {
  padding: 20px;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
