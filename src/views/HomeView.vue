<script setup lang="ts">
import { ref } from "vue";

interface Model {
  id: string;
  name: string;
}

const props = defineProps<{
  selector: (name: string) => void;
  updater: (state: WorkspaceState) => void;
}>();

const models = ref<Model[]>([]);

function upload(event: Event): void {
  const fileInput = event.currentTarget;
  if (fileInput instanceof HTMLInputElement && fileInput.files !== null) {
    const [file] = fileInput.files;
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const str = reader.result as string;
        const obj = JSON.parse(str);
        props.updater(obj);
      });
      reader.readAsText(file);
    }
  }
}

(async () => {
  models.value = await fetch(`http://localhost:8000/models/`).then((res) => res.json());
})();
</script>

<template>
  <main>
    <h2>Model Select</h2>
    <ul>
      <li v-for="val in models" :key="val.id">
        <button @click="() => props.selector(val.id)">{{ val.name }}</button>
      </li>
    </ul>
    <h2>Load Workspace</h2>
    <input type="file" @change="upload" />
  </main>
</template>
