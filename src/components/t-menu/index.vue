<script>
import { h, provide, reactive, Transition, TransitionGroup } from 'vue'
import { getSlot } from '../../util/helpers.js'

export default {
  name: "TMenu",
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup (props, { attrs, emit, slots }) {
    const state = reactive({
      items: [],
      open: false
    })

    const generateActivator = () => {
      const slot = getSlot('activator', slots)

      return h('div', {
        class: ['menu-activator', state.open ? 'menu-open' : ''],
        onClick: () => {
          state.open = !state.open
        },
      }, slot)
    }

    const generateMenuList = () => {
      return state.open
        ? h('ul', {
            class: 'menu-list'
          }, slots.default())
        : undefined
    }

    const generateMenu = () => {
      return [generateActivator(), generateTransition(generateMenuList)]
    }

    const generateTransition = (children) => {
      return h(Transition, {
        enterActiveClass: "transition duration-100 ease-out",
        enterFromClass: "transform scale-90 opacity-0",
        enterToClass: "transform scale-100 opacity-100",
        leaveActiveClass: "transition duration-75 ease-out",
        leaveFromClass: "transform scale-100 opacity-100",
        leaveToClass: "transform scale-90 opacity-0"
      }, children)
    }

    const api = {
      closeMenu () {
        state.open = false
      },
      openMenu () {
        state.open = true
      }
    }

    provide('menu', api)

    return () => h(props.tag, {
      class: 'menu'
    }, generateMenu())
  }
}
</script>

<style scoped>
  .menu {
    @apply relative
  }

  .menu-list {
    @apply menu-list-layout menu-list-position menu-list-styling menu-list-light menu-list-dark
  }

  .menu-list-layout {
    @apply absolute grid grid-flow-row auto-cols-max
  }

  .menu-list-position {
    @apply z-10 mt-1 right-0
  }

  .menu-list-styling {
    @apply rounded shadow-lg py-2 border
  }

  .menu-list-light {
    @apply bg-white border-gray-300 border-opacity-25
  }

  .menu-list-dark {
    @apply dark:bg-gray-700 dark:border-gray-800 dark:border-opacity-50
  }
</style>
