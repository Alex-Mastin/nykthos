<template>
  <div class="deck-actions">
    <t-menu v-if="sortedDecks.length">
      <template #activator>
        <t-button
          class="sort-by"
          variant="filled"
        >
          Sort By
          <t-icon
            size="sm"
          >
            chevron-down
          </t-icon>
        </t-button>
      </template>
      <t-menu-item
        class="sort-option"
        @click="sort = 'created'"
      >
        <t-icon
          v-if="sort === 'created'"
          class="mr-1"
        >
          check
        </t-icon>
        Date created
      </t-menu-item>
      <t-menu-item
        class="sort-option"
        @click="sort = 'updated'"
      >
        <t-icon
          v-if="sort === 'updated'"
          class="mr-1"
        >
          check
        </t-icon>
        Last updated
      </t-menu-item>
    </t-menu>
  </div>
  <div
    v-if="decks.length"
    class="decks"
  >
    <router-link
      v-for="deck in sortedDecks"
      :key="deck"
      :to="`/decks/${deck.id}`"
      class="deck"
    >
      <div class="deck-title">
        <div class="deck-name">
          {{ deck.name }}
        </div>

        <div class="color-identity">
          <t-symbol
            v-for="symbol in deck.colorIdentity"
            :key="symbol"
          >
            {{ symbol }}
          </t-symbol>
          <t-symbol v-if="!deck.colorIdentity.length">
            c
          </t-symbol>
        </div>
      </div>
      <div class="deck-created-date">
        Created {{ new Date(deck.created).toLocaleDateString() }}&ensp;•&ensp;{{ deck.quantity }}
      </div>
    </router-link>
  </div>
  <div
    v-else
    class="decks-placeholder"
  >
    <t-icon class="no-results">
      cloud-cross
    </t-icon>
    <div class="no-results-message">
      No decks found.
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import TButton from '../../components/t-button/index.vue'
import TIcon from '../../components/t-icon/index.vue'
import TMenu from '../../components/t-menu/index.vue'
import TMenuItem from '../../components/t-menu/t-menu-item/index.vue'
import TSymbol from '../../components/t-symbol/index.vue'

export default {
  name: "Decks",
  components: {
    TButton,
    TIcon,
    TMenu,
    TMenuItem,
    TSymbol
  },
  data: () => ({
    sort: 'updated'
  }),
  computed: {
    ...mapGetters([
      'decks'
    ]),
    sortedDecks () {
      const decks = this.decks

      return decks.sort((a, b) => {
        if (this.sort === 'created') {
          return a.created > b.created ? 1 : -1
        } else if (this.sort === 'updated') {
          return a.updated < b.updated ? 1 : -1
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .decks {
    @apply h-full grid lg:grid-cols-3 xl:grid-cols-4 auto-rows-min
  }

  .deck {
    @apply rounded shadow-lg p-4 m-2 deck-light deck-dark deck-hover
  }

  .deck-hover {
    @apply ring-indigo-500 hover:ring-2 hover:shadow-card dark:hover:shadow-card-dark
  }

  .deck-light {
    @apply bg-white
  }

  .deck-dark {
    @apply dark:bg-gray-700 dark:text-white
  }

  .deck-title {
    @apply grid grid-flow-col auto-rows-min items-center mb-2
  }

  .deck-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @apply font-medium text-md mr-4 text-indigo-900 dark:text-white lg:max-w-sm xl:max-w-md
  }

  .color-identity {
    @apply flex justify-end
  }

  .deck-created-date {
    @apply text-sm text-gray-400
  }

  .decks-placeholder {
    height: calc(100vh - 210px);

    @apply grid justify-items-center
  }

  .no-results {
    transform: scale(4);

    @apply text-indigo-200 dark:text-indigo-400 self-end mb-12
  }

  .no-results-message {
    @apply text-indigo-900 dark:text-white
  }

  .deck-actions {
    @apply grid place-items-end mb-4 px-2
  }

  .menu-open {
    .sort-by {
      svg.icon {
        @apply transform rotate-180 scale-50
      }
    }
  }

  .sort-option {
    display: flex;
    justify-content: flex-end;
  }
</style>
