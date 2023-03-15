<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  state: WorkspaceState;
  updater: (update: (s: WorkspaceState) => WorkspaceState) => void;
}>();

interface Res {
  data: string;
  width: number;
  height: number;
  mime_type: string;
}

const filename = ref<string | undefined>(undefined);

const gen = async () => {
  const res: Res = await fetch(`http://localhost:8000/${props.state.model_id}/generate`, { method: "POST" }).then(
    (res) => res.json()
  );
  props.updater((s) => {
    s.data = [...s.data, { data: res.data, width: res.width, height: res.height, mime: res.mime_type }];
    return s;
  });
};

const dataurl = (base64: string, mime_type: string = "image/png") => `data:${mime_type};base64,${base64}`;

function download(event: MouseEvent): void {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(props.state, null, 2)], { type: "application/json" }));
  a.download = `${filename.value ?? props.state.model_id}.json`;
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
        props.updater((s) => obj);
      });
      reader.readAsText(file);
    }
  }
}

const setname = (event: Event) => {
  const t = event.currentTarget as HTMLInputElement;
  filename.value = t.value;
};
</script>

<template>
  <main>
    <h2>Workspace</h2>
    <button @click="gen">GEN</button>
    <button @click="download">DOWNLOAD</button>
    <input type="text" @change="setname" />
    <input type="file" @change="upload" />
    <div id="output">
      <img
        v-for="(i, key) in state.data"
        :key="key"
        :src="dataurl(i.data, i.mime)"
        :width="i.width"
        :height="i.height"
      />
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
