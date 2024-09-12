<script setup lang="ts">
import { ref, watch } from "vue";

import ImageGrid from "../components/ImageGrid.vue";

import SelectionItem from "../components/SelectionItem.vue";

import ComputingIndicator from "../components/ComputingIndicator.vue";

const props = defineProps<{
  state: WorkspaceState;
  update: (s: WorkspaceState) => void;
}>();

interface Res {
  data: string;
  width: number;
  height: number;
  mime_type: string;
}

const a = import.meta.env.VITE_STYLEGAN_API;

const filename = ref<string | undefined>(undefined);

const gen = async () => {
  const res: Res = await fetch(`${a}/${props.state.model_id}/generate`, {
    method: "POST",
  }).then((res) => res.json());

  const data = [...props.state.data, { data: res.data, width: res.width, height: res.height, mime: res.mime_type }];
  const s = { ...props.state, data };
  props.update(s);
};

const dataurl = (base64: string, mime_type: string = "image/png") => `data:${mime_type};base64,${base64}`;

async function name() {}

function download(event: MouseEvent): void {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(props.state, null, 2)], { type: "application/json" }));
  a.download = `${filename.value ?? props.state.model_id}.json`;
  a.dispatchEvent(new MouseEvent("click"));
}

const setname = (event: Event) => {
  const t = event.currentTarget as HTMLInputElement;
  filename.value = t.value;
};

SelectionItem.checked;

const l = ref<Array<HTMLElement>>([]);
</script>

<template>
  <main>
    <h2>Workspace</h2>
    <button @click="gen">GEN</button>
    <button @click="download">DOWNLOAD</button>
    <input type="text" @change="setname" />
    <div id="output">
      <div>
        <SelectionItem v-for="(i, key) in state.data" :key="key" :ref="l" :initial="true" :updater="(v) => {}">
          <img :src="dataurl(i.data, i.mime)" :width="i.width" :height="i.height"
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
