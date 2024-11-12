<script setup lang="ts">
const props = defineProps<{
  size?: string;
  thickness?: string;
  duration?: number;
  message?: string;
  ringColor?: string;
  ringHighlightColor?: string;
}>();

const durationText = props.duration !== undefined && props.duration !== null ? `${props.duration}s` : props.duration;
</script>

<template>
  <div class="loading-indicator">
    <div class="loading-ring"></div>
    <div class="loading-message">{{ message ?? "Loading ..." }}</div>
  </div>
</template>

<style>
:root {
  --loading-indicator-size-default: 32px;
  --loading-indicator-thickness-default: 4px;
  --loading-indicator-duration-default: 0.8s;
  --loading-indicator-ring-color-default: rgba(0, 0, 0, 0.25);
  --loading-indicator-ring-highlight-color-default: black;
}
</style>

<style>
.loading-message {
  font-size: 90%;
}
</style>

<style scoped>
.loading-indicator {
  --size: v-bind("size ?? 'var(--loading-indicator-size-default)'");
  --thickness: v-bind("thickness ?? 'var(--loading-indicator-thickness-default)'");
  --duration: v-bind("durationText ?? 'var(--loading-indicator-duration-default)'");
  --ring-color: v-bind("ringColor ?? 'var(--loading-indicator-ring-color-default)'");
  --ring-highlight-color: v-bind("ringHighlightColor ?? 'var(--loading-indicator-ring-highlight-color-default)'");
}

.loading-indicator {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
}

.loading-ring {
  width: var(--size);
  height: var(--size);
  margin: 3px;
  border: var(--thickness) var(--ring-color) solid;
  border-top: var(--thickness) var(--ring-highlight-color) solid;
  border-radius: 50%;
  animation: rotation var(--duration) infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
