<script setup lang="ts">
import { ref } from "vue";

interface Model {
  id: string;
  name: string;
}

const res = ref<Model[]>([]);

setTimeout(async () => {
  res.value = await fetch(`http://localhost:8000/models/`).then((res) => res.json());
}, 1000);

const data = ref({
  name: "12345",
  count: 12345,
  items: {
    aaa: 1,
    bbb: 2,
  },
});

const setname = (event: Event) => {
  const t = event.currentTarget as HTMLInputElement;
  data.value.name = t.value;
  data.value.items.aaa = 100;
};
</script>

<template>
  <main>
    <h2>Home</h2>
    <input type="text" @change="setname" />
    <p>{{ data.name }}</p>
    <p>{{ data.count }}</p>
    <ul>
      <li v-for="(val, key) in data.items" :key="key">{{ key }}: {{ val }}</li>
    </ul>
    <div id="output"></div>
    <ul>
      <li v-for="val in res" :key="val.id">{{ val.name }}</li>
    </ul>
  </main>
</template>
