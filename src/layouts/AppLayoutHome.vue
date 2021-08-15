<template>
  <main
    class="main"
    v-bind="$attrs"
  >
    <t-container>
      <slot/>
    </t-container>
    <t-hero/>
  </main>
</template>

<script>
import TContainer from '../components/t-container/index.vue'
import THero from '../components/t-hero/index.vue'

export default {
  name: "AppLayoutHome",
  components: {
    TContainer,
    THero
  }
}
</script>

<style scoped lang="scss">
  .main {
    @apply bg-gray-800 text-white
  }
</style>
