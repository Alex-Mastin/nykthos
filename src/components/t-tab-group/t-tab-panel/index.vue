<template>
  <div
    v-show="active"
    ref="panel"
    :class="classes"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  name: "TTabPanel",
  inject: ['tabGroup'],
  computed: {
    classes () {
      return [
        'tab-panel',
        this.active ? '' : 'hidden'
      ]
    },
    index () {
      return this.tabGroup.panels.indexOf(this.$refs.panel)
    },
    active () {
      return this.tabGroup.selectedIndex() === this.index
    }
  },
  mounted () {
    this.tabGroup.registerPanel(this.$refs.panel)
  },
  unmounted() {
    this.tabGroup.unregisterPanel(this.$refs.panel)
  },
}
</script>

<style scoped>
  .tab-panel {

  }
</style>
