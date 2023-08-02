<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  initial: boolean;
  updater: (newValue: boolean) => void;
}>();

const checked = ref<boolean>(props.initial);

watch(checked, (newValue) => {
  props.updater(newValue);
});

defineExpose({
  checked,
});
</script>

<template>
  <label :class="{ selected: checked }">
    <input v-model="checked" type="checkbox" />
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
