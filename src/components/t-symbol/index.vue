<script>
import { h} from "vue";

export default {
  name: "TSymbol",
  props: {
    name: {
      type: String,
      default: null
    }
  },
  render () {
    const icon = this.$slots.default
        ? this.$slots.default()[0].children.trim()
        : this.name

    return h('i', {
      class: `symbol symbol-${icon.toLowerCase()}`
    })
  }
}
</script>

<style scoped lang="scss">
  .symbol {
    filter: drop-shadow(0 1px 0px black);
    margin: 0 1px;

    + .symbol {
      margin-left: 2px;
    }

    @apply inline-block h-4 w-4
  }
  .symbol-w {
    background-image: url("../../assets/svg/symbol-w.svg");
  }
  .symbol-u {
    background-image: url("../../assets/svg/symbol-u.svg");
  }
  .symbol-b {
    background-image: url("../../assets/svg/symbol-b.svg");
  }
  .symbol-r {
    background-image: url("../../assets/svg/symbol-r.svg");
  }
  .symbol-g {
    background-image: url("../../assets/svg/symbol-g.svg");
  }
</style>
