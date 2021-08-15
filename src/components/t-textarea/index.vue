<template>
  <textarea
    v-model="value"
    class="textarea"
    :cols="cols"
    :rows="rows"
    :style="styles"
    @input="onInput"
  ></textarea>
</template>

<script>
export default {
  name: "TTextArea",
  props: {
    cols: {
      type: [String, Number],
      default: '1'
    },
    modelValue: {
      type: String,
      default: ''
    },
    resize: {
      type: Boolean,
      default: true
    },
    rows: {
      type: [String, Number],
      default: '3'
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      styles: [],
      value: ''
    }
  },
  watch: {
    modelValue (value) {
      this.value = value

      this.$nextTick(() => this.updateStyle())
    }
  },
  methods: {
    onInput (event) {
      if (!this.resize) return

      this.updateStyle()
      this.$emit('update:modelValue', event.target.value)
    },
    updateStyle () {
      this.styles = [{ height: `${this.$el.scrollHeight + 2}px` }]
    }
  }
}
</script>

<style scoped lang="scss">
  .textarea {
    &::-webkit-scrollbar {
      width: 1rem;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
    }

    &::-webkit-scrollbar-thumb {
      @apply dark:bg-gray-700
    }

    @apply block w-full border rounded-md shadow-sm max-h-full textarea-focus textarea-light textarea-dark
  }

  .textarea-focus {
    @apply focus:ring-indigo-500 focus:border-indigo-500 focus:ring-2
  }

  .textarea-light {
    @apply border-gray-300
  }

  .textarea-dark {
    @apply dark:border-gray-900 dark:border-opacity-75 dark:bg-gray-700 dark:text-white
  }
</style>
