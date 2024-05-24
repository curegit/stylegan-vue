<script setup lang="ts">
import { ref, computed } from "vue";

import LoadingIndicator from "../components/LoadingIndicator.vue";

import ModelCard from "../components/ModelCard.vue";

interface Model {
  id: string;
  name: string;
  description: string;
  width: number;
  height: number;
}

const props = defineProps<{
  selector: (name: string) => void;
  updater: (state: WorkspaceState) => void;
}>();

type Error = null;

const models = ref<Model[] | Error | undefined>(undefined);

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

const a = "http://127.0.0.1:8000";

(async () => {
  await new Promise((s) => setTimeout(s, 1000));
  const fetchPromise = fetch(`${a}/models/`, {}).then((res) => res.json());
  const timeoutPromise = new Promise((_, reject) => setTimeout(reject, 1000));
  const modelsPromise = await Promise.race([fetchPromise, timeoutPromise]).then(
    (result) => result,
    (error) => {
      console.error(error);
      return null;
    },
  );
  models.value = modelsPromise;
})();
</script>

<template>
  <main>
    <h2>Model Select</h2>
    <LoadingIndicator v-if="models === undefined"></LoadingIndicator>
    <div v-else-if="models === null">Error!!!</div>
    <div v-else>
      <ul>
        <li v-for="val in models" :key="val.id">
          <ModelCard
            :name="val.name"
            :description="val.description"
            :width="val.width"
            :height="val.height"
            @click="() => props.selector(val.id)"
          ></ModelCard>
        </li>
      </ul>
      <h2>Load Workspace</h2>
      <input type="file" @change="upload" />
    </div>
  </main>
</template>
