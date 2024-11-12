<script setup lang="ts">
import { ref } from "vue";

import { getModels } from "../call";
import LoadingIndicator from "../components/LoadingIndicator.vue";
import ModelCard from "../components/ModelCard.vue";

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

(async () => {
  const loadingMinDelay = new Promise((r) => setTimeout(r, 600));
  await loadingMinDelay;
  const timeoutPromise = new Promise<never>((_, reject) => setTimeout(reject, 5000));
  const modelsPromise = await Promise.race([getModels(), timeoutPromise]).then(
    (models) => models,
    (error) => (console.error(error), null),
  );
  models.value = modelsPromise;
})();
</script>

<template>
  <main>
    <h2>Model Select</h2>
    <LoadingIndicator v-if="models === undefined"></LoadingIndicator>
    <div v-else-if="models === null">Sorry, we couldn't load the models. Please try again later.</div>
    <div v-else>
      <ul>
        <li v-for="val in models" :key="val.id">
          <ModelCard :model="val" @click="() => props.selector(val.id)"></ModelCard>
        </li>
      </ul>
      <h2>Load Workspace</h2>
      <input type="file" @change="upload" />
    </div>
  </main>
</template>
