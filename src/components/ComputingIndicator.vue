<script setup lang="ts"></script>

<template>
  <div class="indicator">
    <div class="bar"></div>
  </div>
</template>

<style>
.sp {
  width: 32px;
  height: 32px;
}
.bar {
  width: 50px;
  height: 18px;
  border: 1px #000 solid;
  border-radius: 4px;
  background: linear-gradient(
    -60deg,
    transparent 0%,
    transparent 50%,
    #000 50%,
    #000 75%,
    transparent 75%,
    transparent
  );
  background-size: 20px 30px;
  background-position: 0px 0px;
  animation: spLoadBar 0.8s infinite linear;
}
@keyframes spLoadBar {
  from {
    background-position: 0px 0px;
  }
  to {
    background-position: -20px 0px;
  }
}
</style>
