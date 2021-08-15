<script>
import { h, inject } from 'vue'

export default {
  name: "TMenuItem",
  props: {
    border: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'li'
    }
  },
  setup (props, { attrs, emit, slots }) {
    const menu = inject('menu')

    const classes = () => [
      'menu-item',
      props.border ? 'border' : ''
    ]

    return () => h(props.tag, {
      class: classes(),
      onClick: () => menu.closeMenu()
    }, slots.default())
  }
}
</script>

<style scoped>
  .menu-item {
    @apply w-full py-2 px-4 font-medium text-sm select-none menu-item-light menu-item-dark
  }

  .menu-item-light {
    @apply hover:bg-indigo-100 text-indigo-800
  }

  .menu-item-dark {
    @apply dark:hover:bg-gray-800 dark:hover:bg-opacity-75 dark:text-indigo-200
  }

  .border {
    @apply border-r-0 border-l-0 border-gray-200 my-2
  }
</style>
