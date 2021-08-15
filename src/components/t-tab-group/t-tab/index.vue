<template>
  <button
    ref="tab"
    :class="classes"
    :disabled="disabled || loading"
    @click="setSelectedIndex()"
  >
    <t-icon
      v-if="loading"
      class="loading-icon"
    >
      spinner2
    </t-icon>
    <slot v-else/>
  </button>
</template>

<script>
import TIcon from '../../t-icon/index.vue'

export default {
  name: "TTab",
  components: {
    TIcon
  },
  inject: ['tabGroup'],
  props: {
    disabled: {
      type: Boolean
    },
    loading: {
      type: Boolean
    }
  },
  computed: {
    classes () {
      return [
        'tab',
        this.disabled ? 'tab-disabled' : '',
        this.loading ? 'tab-loading' : '',
        this.selected ? 'selected' : '',
      ]
    },
    index () {
      return this.tabGroup.tabs.indexOf(this.$refs.tab)
    },
    selected () {
      return this.tabGroup.selectedIndex() === this.index
    }
  },
  mounted () {
    this.tabGroup.registerTab(this.$refs.tab)
  },
  unmounted() {
    this.tabGroup.unregisterTab(this.$refs.tab)
  },
  methods: {
    setSelectedIndex () {
      this.tabGroup.setSelectedIndex(this.index)
    }
  }
}
</script>

<style scoped>
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .tab {
    @apply rounded bg-transparent px-8 py-2 font-semibold text-sm tab-focus tab-light tab-dark
  }

  .tab-disabled {
    @apply opacity-25 pointer-events-none
  }

  .tab-loading {
    position: relative;
    min-width: 106.41px;
  }

  .loading-icon {
    top: calc(50% - 12px);
    zoom: 75%;

    @apply absolute animate-spin mx-auto inset-x-0 pointer-events-none
  }

  .tab-light {
    @apply tab-hover-light text-indigo-800
  }

  .tab-dark {
    @apply tab-hover-dark dark:text-white
  }

  .tab-focus {
    @apply focus:ring-indigo-500 focus:border-indigo-500 focus:ring-2
  }

  .tab-hover-light:not(.selected) {
    @apply hover:bg-indigo-100
  }

  .tab-hover-dark:not(.selected) {
    @apply dark:hover:bg-gray-500 dark:hover:text-white
  }

  .selected {
    @apply selected-light selected-dark
  }

  .selected-light {
    @apply bg-white text-indigo-900
  }

  .selected-dark {
    @apply dark:bg-gray-800 dark:bg-opacity-75
  }
</style>
