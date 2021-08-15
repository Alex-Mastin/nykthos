<template>
  <header class="header">
    <div class="px-16">
      <div class="grid grid-flow-col grid-rows-1 gap-x-2 navigation items-center py-2">
        <router-link
          to="/"
          class="relative bottom-0.5"
        >
          <t-icon
            class="text-indigo-400"
            size="xl"
          >
            nykthos
          </t-icon>
        </router-link>
        <nav class="mx-10">
          <t-button-group>
            <t-button
              tag="router-link"
              to="/"
            >
              Home
            </t-button>
            <t-button
              tag="router-link"
              to="/decks"
            >
              Your Decks
            </t-button>
          </t-button-group>
        </nav>

        <t-menu>
          <template #activator>
            <t-button icon>
              <t-icon>gear3</t-icon>
            </t-button>
          </template>
          <t-menu-item
            v-if="darkMode"
            @click="toggleDarkMode()"
          >
            <t-icon class="mr-0.5">
              brightness
            </t-icon>
            Light Mode
          </t-menu-item>
          <t-menu-item
            v-else
            @click="toggleDarkMode()"
          >
            <t-icon class="mr-0.5">
              moon
            </t-icon>
            Dark Mode
          </t-menu-item>
        </t-menu>

        <t-button @click="createNewDeck()">
          <t-icon class="inline">
            plus
          </t-icon>
          New Deck
        </t-button>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TButton from '../t-button/index.vue'
import TButtonGroup from '../t-button-group/index.vue'
import TIcon from '../t-icon/index.vue'
import TMenu from '../t-menu/index.vue'
import TMenuItem from '../t-menu/t-menu-item/index.vue'

export default {
  components: {
    TButton,
    TIcon,
    TButtonGroup,
    TMenu,
    TMenuItem
  },
  computed: {
    ...mapGetters([
      'darkMode'
    ])
  },
  methods: {
    ...mapActions([
      'toggleDarkMode'
    ]),
    createNewDeck () {
      if (this.$route.name !== 'Deck') this.$router.push('/decks/new')
    }
  }
}
</script>

<style scoped>
  .header {
    @apply block bg-indigo-900 z-10 relative
  }

  .navigation {
    grid-template-columns: auto 1fr auto;
  }
</style>
