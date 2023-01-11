<script setup lang="ts">
import { ref } from "vue";

const ini: { model_id: string; items: Res[] } = {
  model_id: "afhq",
  items: [],
};

const state = ref(ini);

interface Res {
  data: string;
  width: number;
  height: number;
}

const gen = async () => {
  const res: Res = await fetch(`http://localhost:8000/${state.value.model_id}/generate`).then((res) => res.json());
  state.value.items.push(res);
};

const dataurl = (base64: string) => "data:image/png;base64," + base64;
</script>

<template>
  <main>
    <h2>Workspace</h2>
    <button @click="gen">GEN</button>
    <div id="output">
      <img v-for="(i, key) in state.items" :key="key" :src="dataurl(i.data)" :width="i.width" :height="i.height" />
    </div>
  </main>
</template>

<style scoped>
#output {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: left;
}
</style>
