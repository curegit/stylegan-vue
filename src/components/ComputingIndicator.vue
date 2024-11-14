<script setup lang="ts">
defineProps<{
  barColor?: string;
  scale?: number;
  speedFactor?: number;
}>();
</script>

<template>
  <div class="computing-indicator">
    <div class="computing-indicator-bar"></div>
  </div>
</template>

<style>
:root {
  --computing-indicator-bar-color-default: #000;
  --computing-indicator-scale-default: 1;
  --computing-indicator-speed-factor-default: 1;
}

:where(.computing-indicator) {
  display: flex;
  flex-wrap: wrap;
  min-width: 50px;
}

:where(.computing-indicator-bar) {
  width: 100%;
  border-radius: 4px;
  background: transparent;
}
</style>

<style scoped>
.computing-indicator {
  --bar-color: v-bind("barColor ?? 'var(--computing-indicator-bar-color-default)'");
  --scale: v-bind("scale ?? 'var(--computing-indicator-scale-default)'");
  --speed-factor: v-bind("speedFactor ?? 'var(--computing-indicator-speed-factor-default)'");
  --interval: 20px;
}

.computing-indicator-bar {
  height: calc(18px * var(--scale));
  border: 1px var(--bar-color) solid;
  background: linear-gradient(-60deg, transparent 0%, transparent 50%, var(--bar-color) 50%, var(--bar-color) 75%, transparent 75%, transparent);
  background-size: calc(var(--interval) * var(--scale)) calc(1.5 * var(--interval) * var(--scale));
  background-position: 0 0;
  background-repeat: repeat-x;
  animation: computingIndicatorBar calc(0.8s / var(--speed-factor)) infinite linear;
}

@keyframes computingIndicatorBar {
  from {
    background-position-x: 0px;
  }
  to {
    background-position-x: calc(var(--interval) * var(--scale));
  }
}
</style>
