<script setup lang="ts">
const selected = defineModel<boolean>({ required: true, default: false });
</script>

<template>
  <label :class="{ selected: selected }">
    <input v-model="selected" type="checkbox" />
    <div>
      <slot></slot>
    </div>
  </label>
</template>

<style>
label {
  display: block;
}

label.selected {
  background-color: aquamarine;
}
</style>
