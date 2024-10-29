<script setup lang="ts">
import { ref, computed, VNode } from "vue";

import { client, getModelsDict } from "../call";
import { dataurl } from "../utils";
import ImageGrid from "../components/ImageGrid.vue";

import SelectionItem from "../components/SelectionItem.vue";

import ComputingIndicator from "../components/ComputingIndicator.vue";

const props = defineProps<{
  state: WorkspaceState;
  updater: (s: WorkspaceState) => void;
}>();

const filename = ref<string | undefined>(undefined);

async function modelSpec() {
  return (await getModelsDict())[props.state.modelId];
}

const gen = async () => {
  const { data } = await client.POST("/{model_id}/generate", { params: { path: { model_id: props.state.modelId } } });
  if (data) {
    //const s = {...props.state };
    const s = props.state;
    s.data.gen = [...s.data.gen, data];
    props.updater(s);
  }
};

async function name() {}

function download(event: MouseEvent): void {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(props.state, null, 2)], { type: "application/json" }));
  a.download = `${filename.value ?? props.state.modelId}.json`;
  a.dispatchEvent(new MouseEvent("click"));
}

const setname = (event: Event) => {
  const t = event.currentTarget as HTMLInputElement;
  filename.value = t.value;
};

SelectionItem.checked;

const l = ref<any>(undefined);
</script>

<template>
  <main>
    <h2>Workspace</h2>
    <button @click="gen">GEN</button>
    <button @click="download">DOWNLOAD</button>
    <input type="text" @change="setname" />
    <div id="output">
      <div>
        <SelectionItem v-for="(i, key) in state.data.gen" :key="key" :ref="l" :initial="true" :updater="(v) => {}">
          <img :src="dataurl(i.data, i.mimeType)" :width="i.width" :height="i.height"
        /></SelectionItem>
        <ComputingIndicator></ComputingIndicator>
      </div>
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
