<script setup lang="ts"></script>

<template>
  <div class="horizontal">
    <section>
      <slot name="left"></slot>
    </section>
    <section>
      <slot name="right"></slot>
    </section>
  </div>
</template>

<style scoped>
.horizontal {
  display: grid;
  grid-template-columns: 1fr 300px;
}
</style>
