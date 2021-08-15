<template>
  <div :class="classes">
    <img
      class="preview"
      :src="src"
      @load="onLoad()"
    />
    <span
      v-if="!loading"
      class="quantity"
    >x{{ quantity }}</span>
  </div>
</template>

<script>
import TIcon from '../t-icon/index.vue'

export default {
  name: "TCardPreview",
  components: {
    TIcon
  },
  props: {
    card: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data: () => ({
    loading: true
  }),
  computed: {
    classes () {
      return [
        'card-preview',
        this.loading ? 'loading' : ''
      ]
    },
    src () {
      if (this.card.images) return this.card.images.border_crop
      else {
        return this.card.cardFaces[0].image_uris.border_crop
      }
    },
    quantity () {
      return this.card.quantity
    }
  },
  methods: {
    onLoad () {
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
  .loading {
    height: 345px !important;

    @apply bg-indigo-200 dark:bg-gray-700 rounded-lg animate-pulse
  }

  .card-preview {
    @apply relative h-full w-full hover:shadow-2xl
  }

  .preview {
    @apply rounded-lg preview-hover
  }

  .preview-hover {
    @apply ring-indigo-500 hover:ring-2 filter hover:drop-shadow-card dark:hover:drop-shadow-card-dark
  }

  .quantity {
    filter: drop-shadow(0 2px 3px black);

    @apply absolute top-5 right-5 text-white font-bold text-3xl
  }
</style>
