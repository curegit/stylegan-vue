<script setup lang="ts">
import { ref, computed, VNode } from "vue";

import { client, getModelsDict } from "../call";
import { dataurl } from "../utils";
import ImageGrid from "../components/ImageGrid.vue";

import HoriSplit from "../layouts/HoriSplit.vue";

import SelectionItem from "../components/SelectionItem.vue";

import ComputingIndicator from "../components/ComputingIndicator.vue";

import TabStack from "../components/TabStack.vue";

import { runModel } from "../call";

const props = defineProps<{
  state: WorkspaceState;
  updater: (s: WorkspaceState) => void;
}>();

const filename = ref<string | undefined>(undefined);

async function modelSpec() {
  return (await getModelsDict())[props.state.modelId];
}

const gen = async () => {
  const task = runModel("/{model_id}/generate", { params: { path: { model_id: props.state.modelId } } });

  gen_pending.value.push(task);
  const { data } = await task;
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

const l = ref<any>(undefined);

const array = ref<any>({ あああああ: "ああああ", null: 111, iiii: 1111, pppp: "23344" });
</script>

<template>
  <main>
    <h2>Workspace</h2>
    <button @click="gen">GEN</button>
    <button @click="download">DOWNLOAD</button>
    <input type="text" @change="setname" />

    <TabStack :custom-titles="{ あああああ: 'nnn' }">
      <template #generate :props="122">
        <div id="output">
          <HoriSplit>
            <template #left>
              <div>
                <ImageGrid>
                  <template v-for="(i, key) in state.data.gen" :key="key" #[key]>
                    <img :src="dataurl(i.data, i.mimeType)" :width="i.width" :height="i.height" />
                  </template>
                </ImageGrid>
                <ComputingIndicator :scale="1.5"></ComputingIndicator>
              </div>
            </template>
            <template #right>ss </template>
          </HoriSplit>
        </div>
      </template>
      <template v-for="(label, index) in array" :key="index" #[index] :props="1">{{ label }}</template>
    </TabStack>
  </main>
</template>
