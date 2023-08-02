<script setup lang="ts">
defineProps<{
  size?: string;
  thickness?: string;
  duration?: number;
}>();
</script>

<template>
  <div class="indicator">
    <div class="circle"></div>
    <div class="message">
      <slot>Loading...</slot>
    </div>
  </div>
</template>

<style scoped>
.indicator {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
}

.message {
  color: #333;
  font-size: 90%;
}

.circle {
  width: v-bind("size ?? '32px'");
  height: v-bind("size ?? '32px'");
  margin: 3px;
  border: v-bind("thickness ?? '4px'") rgba(0, 0, 0, 0.25) solid;
  border-top: v-bind("thickness ?? '4px'") black solid;
  border-radius: 50%;
  animation: rotation v-bind("`${duration ?? 0.8}s`") infinite linear;
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
