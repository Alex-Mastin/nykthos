<script>
import { h } from 'vue'
import { getSlot } from "../../util/helpers";

export default {
  name: "TLink",
  props: {
    tag: {
      type: String,
      default: 'a'
    },
    to: {
      type: String,
      default: ''
    }
  },
  setup (props, { attrs, emit, slots }) {
    const getProps = () => {
      return props.tag === 'router-link' ? {
        to: props.to
      } : {}
    }

    return () => h(props.tag, getProps(), getSlot('default', slots))
  }
}
</script>

<style scoped>
  a {
    @apply text-indigo-400 underline
  }
</style>
