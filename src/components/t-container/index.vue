<template>
  <div class="layout-container">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "TContainer"
}
</script>

<style scoped>
  .layout-container {
    @apply container mx-auto h-full
  }
</style>
