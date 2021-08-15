<template>
  <main
    class="main"
    v-bind="$attrs"
  >
    <t-container class="pt-8 pb-36">
      <slot/>
    </t-container>
  </main>
</template>

<script>
import TContainer from '../components/t-container/index.vue'

export default {
  name: "AppLayoutDefault",
  components: {
    TContainer
  }
}
</script>

<style scoped>

</style>
