<template>
  <div></div>
</template>

<script>
import { v4 as uuid } from 'uuid'

export default {
  name: "Deck Redirect",
  mounted () {
    this.$router.push(`/decks/${uuid()}`)
  }
}
</script>

<style scoped>

</style>
