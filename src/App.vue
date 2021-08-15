<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script>
  import AppLayout from './layouts/AppLayout.vue'

  export default {
    components: {
      AppLayout
    }
  }
</script>

<style lang="scss">
  div[id="app"] {
    &.dark {
      @apply bg-gray-800;
    }
  }
</style>
