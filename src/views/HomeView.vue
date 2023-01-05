<script setup lang="ts">
function upload(event: MouseEvent) {}

const data = {
  aaa: "12345",
  bbb: 12345,
};

function download(event: MouseEvent) {
  console.log("aaa");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
  a.download = `${data.aaa}.json`;
  a.dispatchEvent(new MouseEvent("click"));
}
</script>

<template>
  <main>
    <h2>Home</h2>
    <button @click="upload">Upload JSON</button>
    <button @click="download">Download JSON</button>
  </main>
</template>
