<template>
  <div class="tab-group">
    <div class="tab-list">
      <slot name="tabs"/>
    </div>
    <div class="tab-panels">
      <slot name="panels"/>
    </div>
  </div>
</template>

<script>

export default {
  name: "TTabGroup",
  provide () {
    return {
      tabGroup: {
        panels: this.panels,
        registerPanel: this.registerPanel,
        registerTab: this.registerTab,
        selectedIndex: this.getSelectedIndex,
        setSelectedIndex: this.setSelectedIndex,
        tabs: this.tabs,
        unregisterPanel: this.unregisterPanel,
        unregisterTab: this.unregisterTab
      }
    }
  },
  props: {
    modelValue: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      panels: [],
      selectedIndex: 0,
      tabs: [],
    }
  },
  methods: {
    getSelectedIndex () {
      return this.selectedIndex
    },
    registerPanel (panel) {
      if (!this.panels.includes(panel)) this.panels.push(panel)
    },
    registerTab (tab) {
      if (!this.tabs.includes(tab)) this.tabs.push(tab)
    },
    setSelectedIndex (index) {
      if (this.selectedIndex === index) return
      this.selectedIndex = index
      this.$emit('update:modelValue', index)
    },
    unregisterPanel (panel) {
      const index = this.panels.indexOf(panel)
      if (index !== -1) this.panels.slice(index, 1)
    },
    unregisterTab (tab) {
      const index = this.tabs.indexOf(tab)
      if (index !== -1) this.tabs.slice(index, 1)
    }
  }
}
</script>

<style scoped>
  .tab-list {
    @apply absolute grid grid-flow-col auto-cols-max gap-x-1 p-0.5 top-0 left-0 rounded-md tab-list-light tab-list-dark
  }

  .tab-list-light {
    @apply bg-indigo-200
  }

  .tab-list-dark {
    @apply dark:bg-gray-700
  }

  .tab-panels {
    @apply mt-14 w-full
  }
</style>
