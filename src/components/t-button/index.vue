<template>
  <component
    :is="tag"
    :class="classes"
    :to="to"
    :type="type"
    @click="onClick($event)"
  >
    <slot/>
  </component>
</template>

<script>
export default {
  name: "TButton",
  props: {
    disabled: {
      type: Boolean
    },
    icon: {
      type: Boolean
    },
    tag: {
      type: String,
      default: 'button'
    },
    textSize: {
      type: String,
      default: 'sm'
    },
    to: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'button'
    },
    variant: {
      type: String,
      default: 'ghost'
    }
  },
  emits: ['click'],
  computed: {
    classes () {
      return [
        this.disabled ? 'btn-disabled': '',
        this.icon ? 'btn-icon' : 'btn-text',
        `btn-${ this.variant }`,
        `text-${this.textSize}`
      ]
    }
  },
  methods: {
    onClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style scoped>
  .btn {
    @apply grid grid-flow-col gap-x-1 place-items-center focus:outline-none text-indigo-200 hover:text-white
  }

  .btn-ghost {
    @apply hover:bg-white hover:bg-opacity-10
  }

  .btn-filled {
    @apply bg-indigo-600 hover:bg-indigo-700
  }

  .btn-icon {
    @apply btn flex-shrink-0 p-2 rounded-full
  }

  .btn-text {
    @apply btn py-2 px-3 rounded font-semibold
  }

  .btn-disabled {
    @apply opacity-75 pointer-events-none
  }
</style>
