<script setup lang="ts">
import { ref } from "vue";

import { dataurl } from "../utils";
import ImageGrid from "../components/ImageGrid.vue";

import HorizontalSplitter from "../components/HorizontalSplitter.vue";

import ComputingIndicator from "../components/ComputingIndicator.vue";

import TabStack from "../components/TabStack.vue";

import { runModelGenerate } from "../call";

const props = defineProps<{
  state: WorkspaceState;
  updater: (s: WorkspaceState) => void;
}>();

const filename = ref<string | undefined>(undefined);

function uuid() {
  return URL.createObjectURL(new Blob()).slice(-36);
}

const generate_new_image = async () => {
  const task = runModelGenerate(props.state.modelId);

  gen_pending.value.push(task);
  const { data } = await task;

  if (data) {
    const s = props.state;

    s.data.generated.default.images[uuid()] = data;
    gen_pending.value = gen_pending.value.filter((x) => x !== task);
    props.updater(s);
  }
};

function download_workspace(): void {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(props.state, null, 2)], { type: "application/json" }));
  a.download = `${filename.value ?? props.state.modelId}.json`;
  a.dispatchEvent(new MouseEvent("click"));
}

const set_filename = (event: Event) => {
  const t = event.currentTarget as HTMLInputElement;
  filename.value = t.value;
};

const array = ref<Record<string, string | number>>({ あああああ: "ああああ", null: 111, iiii: 1111, pppp: "23344" });

function dict<T>(pairs: Array<[string | number, T]>) {
  return pairs.map(([k, v]) => ({ [k]: v })).reduce((l, r) => Object.assign(l, r), {});
}

//onst gens = computed(() => dict(props.state.data.generated.default.images.map((x, i) => [i, { src: dataurl(x.data, x.mimeType) }])));

const gen_pending = ref<object[]>([]);

const customTabTitles = ref<Record<string, string>>({});

const selected = ref<{ [key: string]: boolean }>({});

function deletea(d: { [key: string]: SimpleImage }, se: { [key: string]: boolean }) {
  console.log(d, se);
  function delete_gen() {
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
    <button @click="generate_new_image">GEN</button>
    <button @click="download_workspace">DOWNLOAD</button>
    <input type="text" @change="set_filename" />

    <TabStack :custom-titles="customTabTitles">
      <template #generate>
        <HorizontalSplitter>
          <template #left>
            <div>
              <ImageGrid v-model="selected" :images="mp(state.data.generated.default.images)">
                <template v-for="(_, index) in gen_pending" :key="index">
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
      <template v-for="(label, index) in array" :key="index" #[index]>{{ label }}</template>
    </TabStack>
  </main>
</template>
