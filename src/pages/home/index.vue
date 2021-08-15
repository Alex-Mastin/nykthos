<template>
  <div class="h-full grid justify-items-center items-start">
    <div class="relative grid mt-64 place-items-center z-10">
      <h1 class="hero-text">
        Untap. Draw. Flip the Table.
      </h1>
      <h4 class="hero-subtext">
        <span class="font-medium">Nykthos</span>
        is a deck generator for
        <span class="font-medium">Tabletop Simulator</span>
      </h4>
      <t-button
        tag="router-link"
        to="/decks"
        text-size="md"
        class="mt-4"
        variant="filled"
      >
        Get Started
        <t-icon class="ml-1">
          arrow-right-circle
        </t-icon>
      </t-button>
    </div>
  </div>
</template>

<script>
import TButton from '../../components/t-button/index.vue'
import TIcon from '../../components/t-icon/index.vue'

export default {
  name: "Home",
  components: {
    TButton,
    TIcon
  },
}
</script>

<style scoped>
  .hero-text {
    @apply text-indigo-400
  }

  .hero-subtext {
    @apply font-extralight
  }
</style>
