<script setup lang="ts">
import { ref } from "vue";

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

function upload(event: Event): void {
  const fileInput = event.currentTarget;
  const output = document.getElementById("output")!;
  if (fileInput instanceof HTMLInputElement && fileInput.files !== null) {
    const [file] = fileInput.files;
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        output.innerText = reader.result as string;
        const obj = JSON.parse(output.innerText);
        data.value = obj;
      });
      reader.readAsText(file);
    }
  }
}

function download(event: MouseEvent): void {
  console.log("aaa");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data.value, null, 2)], { type: "application/json" }));
  a.download = `${data.value.name}.json`;
  a.dispatchEvent(new MouseEvent("click"));
}
</script>

<template>
  <main>
    <h2>Home</h2>
    <input type="text" @change="setname" />
    <button @click="download">Download JSON</button>
    <input type="file" @change="upload" />
    <p>{{ data.name }}</p>
    <p>{{ data.count }}</p>
    <ul>
      <li v-for="(val, key) in data.items" :key="key">{{ key }}: {{ val }}</li>
    </ul>
    <div id="output"></div>
  </main>
</template>
