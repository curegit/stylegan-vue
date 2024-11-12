<script setup lang="ts">
const props = defineProps<{
  size?: string;
  thickness?: string;
  duration?: number;
}>();

const durationText = props.duration !== undefined && props.duration !== null ? `${props.duration}s` : props.duration;
</script>

<template>
  <div class="loading-indicator">
    <div class="loading-circle"></div>
    <div class="loading-message">
      <slot>Loading ...</slot>
    </div>
  </div>
</template>

<style>
:root {
  --loading-indicator-size-default: 32px;
  --loading-indicator-thickness-default: 4px;
  --loading-indicator-duration-default: 0.8s;
}
</style>

<style scoped>
.loading-indicator {
  --size: v-bind("size ?? 'var(--loading-indicator-size-default)'");
  --thickness: v-bind("thickness ?? 'var(--loading-indicator-thickness-default)'");
  --duration: v-bind("durationText ?? 'var(--loading-indicator-duration-default)'");
}

.loading-indicator {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
}

.loading-message {
  color: #333;
  font-size: 90%;
}

.loading-circle {
  width: var(--size);
  height: var(--size);
  margin: 3px;
  border: var(--thickness) rgba(0, 0, 0, 0.25) solid;
  border-top: var(--thickness) black solid;
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
