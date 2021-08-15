<template>
  <div class="btn-group">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "TButtonGroup"
}
</script>

<style scoped>
  .btn-group {
    @apply grid grid-flow-col auto-cols-max gap-x-2
  }
</style>
