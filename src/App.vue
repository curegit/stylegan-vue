<script setup lang="ts">
import { ref, watch } from "vue";

import HeaderPart from "./parts/HeaderPart.vue";
import HomeView from "./views/HomeView.vue";
import WorkspaceView from "./views/WorkspaceView.vue";
import FooterPart from "./parts/FooterPart.vue";

const state = ref<WorkspaceState | null>(null);

const dirty = ref<boolean>(false);

watch(state, (newValue) => {
  if (newValue === null) {
    dirty.value = false;
  } else if (Object.values(newValue.data).every((x) => !x)) {
    dirty.value = false;
  } else {
    dirty.value = true;
  }
});

watch(dirty, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    if (newValue) {
      document.title = "*" + document.title;
    } else {
      document.title = document.title.substring(1);
    }
  }
});

window.addEventListener("beforeunload", (event) => {
  if (dirty.value) {
    event.preventDefault();
  }
});

function update(newState: WorkspaceState) {
  state.value = newState;
}

function selectModel(name: string) {
  state.value = {
    model_id: name,
    data: { gen: [] },
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
    <HomeView v-if="state === null" :selector="selectModel" :updater="update" />
    <Transition name="bounce">
      <WorkspaceView v-if="state !== null" :state="state" :updater="update" />
    </Transition>
  </div>
  <FooterPart />
</template>

<style>
#view {
  padding: 20px;
}
</style>
