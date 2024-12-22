<template>
  <div class="horizontal-splitter">
    <section>
      <slot name="left"></slot>
    </section>
    <section>
      <slot name="right"></slot>
    </section>
  </div>
</template>

<style scoped>
.horizontal-splitter {
  display: grid;
  grid-template-columns: 1fr 300px;
}
</style>
