<script setup lang="ts">
import { ref } from "vue";
import { getModels } from "../call";
import { dataurl } from "../utils";
import ItemCard from "../components/ThumbnailCard.vue";
import LoadingIndicator from "../components/LoadingIndicator.vue";

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

const loadingMinDelayMs = 800;
const timeoutMs = 5000;

(async () => {
  await new Promise((r) => setTimeout(r, loadingMinDelayMs));
  const timeoutPromise = new Promise<never>((_, reject) => setTimeout(reject, timeoutMs));
  const modelsPromise = await Promise.race([getModels(), timeoutPromise]).then(
    (models) => models,
    (error) => (console.error(error), null),
  );
  models.value = modelsPromise;
})();
</script>

<template>
  <main>
    <h2>New Workspace</h2>
    <LoadingIndicator v-if="models === undefined"></LoadingIndicator>
    <div v-else-if="models === null">Sorry, we couldn't load the models. Please try again later.</div>
    <div v-else>
      <ul class="model-list">
        <li v-for="val in models" :key="val.id">
          <ItemCard class="model-list-card" :thumbnail="dataurl(val.example, val.mimeType)" @click="() => props.selector(val.id)">
            <h3 class="name">{{ val.name }}</h3>
            <div class="description">{{ val.description }} ({{ val.width }}x{{ val.height }})</div>
          </ItemCard>
        </li>
      </ul>
      <h2>Load Workspace</h2>
      <input type="file" @change="upload" />
    </div>
  </main>
</template>

<style scoped>
.model-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  align-items: stretch;
  gap: 20px;
}

.model-list li {
  display: block;
}

.model-list-card {
  height: 100%;
  cursor: pointer;
}

@media (any-hover: hover) {
  .model-list-card:hover {
    background-color: #fff6;
  }
}
</style>
