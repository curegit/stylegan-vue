<script setup lang="ts">
import { ref } from "vue";

import { getModelsDict } from "../call";
import { dataurl } from "../utils";
import ImageGrid from "../components/ImageGrid.vue";

import HorizontalSplitter from "../components/HorizontalSplitter.vue";

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

function uuid() {
  return URL.createObjectURL(new Blob()).slice(-36);
}

const gen = async () => {
  const task = runModel("/{model_id}/generate", { params: { path: { model_id: props.state.modelId } } });

  gen_pending.value.push(task);
  const { data, error } = await task;

  if (data) {
    const s = props.state;

    s.data.generated.default.images[uuid()] = data as any;
    gen_pending.value = gen_pending.value.filter((x) => x !== task);
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

function dict<T>(pairs: Array<[string | number, T]>) {
  return pairs.map(([k, v]) => ({ [k]: v })).reduce((l, r) => Object.assign(l, r), {});
}

//onst gens = computed(() => dict(props.state.data.generated.default.images.map((x, i) => [i, { src: dataurl(x.data, x.mimeType) }])));

const gen_pending = ref<object[]>([]);

const customTabTitles = ref<Record<string, string>>({});

const selected = ref<{ [key: string]: boolean }>({});

function send() {}

function deletea(d: { [key: string]: any }, se: { [key: string]: boolean }) {
  console.log(d, se);
  function delete_gen(event: MouseEvent) {
    for (const [key, value] of Object.entries(se)) {
      if (value) {
        delete d[key];
      }
    }
  }
  return delete_gen;
}

function mp(image: { [key: string]: SimpleImage }) {
  return dict(Object.entries(image).map(([k, v]) => [k, { src: dataurl(v.data, v.mimeType) }]));
}
</script>

<template>
  <main>
    <h2>Workspace</h2>
    <button @click="gen">GEN</button>
    <button @click="download">DOWNLOAD</button>
    <input type="text" @change="setname" />

    <TabStack :custom-titles="customTabTitles">
      <template #generate>
        <HorizontalSplitter>
          <template #left>
            <div>
              <ImageGrid :images="mp(state.data.generated.default.images)" v-model="selected">
                <template v-for="_ in gen_pending" :key="_">
                  <ComputingIndicator :scale="1.5"></ComputingIndicator>
                </template>
              </ImageGrid>
            </div>
          </template>
          <template #right>
            <button @click="deletea(state.data.generated.default.images, selected)">Delete</button>
          </template>
        </HorizontalSplitter>
      </template>
      <template v-for="(label, index) in array" :key="index" #[index] :props="1">{{ label }}</template>
    </TabStack>
  </main>
</template>
