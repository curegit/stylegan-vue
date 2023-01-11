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

function download(event: MouseEvent): void {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(state.value, null, 2)], { type: "application/json" }));
  a.download = `${state.value.model_id}.json`;
  a.dispatchEvent(new MouseEvent("click"));
}

function upload(event: Event): void {
  const fileInput = event.currentTarget;
  if (fileInput instanceof HTMLInputElement && fileInput.files !== null) {
    const [file] = fileInput.files;
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const str = reader.result as string;
        const obj = JSON.parse(str);
        state.value = obj;
      });
      reader.readAsText(file);
    }
  }
}
</script>

<template>
  <main>
    <h2>Workspace</h2>
    <button @click="gen">GEN</button>
    <button @click="download">DOWNLOAD</button>
    <input type="file" @change="upload" />
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
