<script setup lang="ts">
import { ref } from "vue";

interface Model {
  id: string;
  name: string;
}

const props = defineProps<{
  selector: (name: string) => void;
}>();

const models = ref<Model[]>([]);

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
  </main>
</template>
