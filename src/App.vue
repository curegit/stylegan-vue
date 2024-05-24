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
  } else if (newValue.data.length === 0) {
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
    event.returnValue = "";
  }
});

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
    <Transition name="bounce">
      <WorkspaceView v-if="state !== null" :state="state" :update="update" />
    </Transition>
  </div>
  <FooterPart />
</template>

<style>
#view {
  padding: 20px;
}
</style>
