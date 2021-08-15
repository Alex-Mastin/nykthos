<template>
  <t-header/>
  <component :is="$route.meta.layout">
    <slot/>
  </component>
  <t-footer/>
</template>

<script>
import { onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import THeader from '../components/t-header/index.vue'
import TFooter from '../components/t-footer/index.vue'

export default {
  name: 'AppLayout',
  components: {
    TFooter,
    THeader
  },
  setup () {
    const store = useStore()
    const darkMode = () => store.getters.darkMode

    const applyDarkMode = (value) => {
      const app = document.getElementById('app')

      if (value) app.setAttribute('class', 'dark')
      else app.removeAttribute('class')
    }

    watch(darkMode, (value) => applyDarkMode(value))
    onMounted(() => applyDarkMode(darkMode()))

    return {
      darkMode: darkMode()
    }
  }
}
</script>

<style>
.main {
  min-height: calc(100vh - 56px);

  @apply bg-gray-200 dark:bg-gray-800
}
</style>

<style scoped>

</style>
