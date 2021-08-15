<template>
  <IconBase :class="['icon', `size-${size}`]">
    <slot/>
  </IconBase>
</template>

<script>
import IconBase from "lindua-icons/vue/IconBase";

export default {
  name: "Icon",
  components: {
    IconBase
  },
  props: {
    size: {
      type: String,
      default: 'md'
    }
  }
}
</script>

<style scoped>
  .icon {
    @apply inline fill-current transform
  }

  .size-sm {
    @apply scale-50
  }

  .size-md {
    @apply scale-75
  }

  .size-lg {
    @apply scale-100
  }

  .size-xl {
    @apply scale-125
  }

  .size-2xl {
    @apply scale-150
  }
</style>
