import { defineAsyncComponent, h } from 'vue'
import nykthos from './nykthos.vue'
import gear3 from './gear3.vue'
import brightness from './brightness.vue'
import moon from './moon.vue'
import plus from './plus.vue'
import spinner2 from './spinner2.vue'
import infoCircle from './info-circle.vue'
import downloadCircle from './download-circle.vue'
import chevronDown from './chevron-down.vue'
import check from './check.vue'
import cloudCross from './cloud-cross.vue'
import arrowRightCircle from './arrow-right-circle.vue'

export default {
  props: {
    name: {
      type: String
    }
  },
  render () {
    const icon = this.$slots.default
      ? this.$slots.default()[0].children[0].children.trim()
      : this.name

    switch (icon) {
      case 'nykthos':
        return h(nykthos)
      case 'gear3':
        return h(gear3)
      case 'brightness':
        return h(brightness)
      case 'moon':
        return h(moon)
      case 'plus':
        return h(plus)
      case 'spinner2':
        return h(spinner2)
      case 'info-circle':
        return h(infoCircle)
      case 'download-circle':
        return h(downloadCircle)
      case 'chevron-down':
        return h(chevronDown)
      case 'check':
        return h(check)
      case 'cloud-cross':
        return h(cloudCross)
      case 'arrow-right-circle':
        return h(arrowRightCircle)
    }

    return h(defineAsyncComponent(() => import(`../svg/${icon}.svg`)))
  }
}
