<template>
  <div class="deck-generator">
    <input
      v-model="name"
      type="text"
      class="deck-name"
    />
    <div class="deck-generator-actions">
      <div class="place-self-start">
        <t-tab-group v-model="selectedTab">
          <template #tabs>
            <t-tab>Bulk Import</t-tab>
            <t-tab
              :disabled="disablePreview"
              :loading="loading"
            >
              Preview
            </t-tab>
          </template>
          <template #panels>
            <t-tab-panel>
              <t-textarea
                v-model="decklist"
                :placeholder="placeholder"
                class="bulk-import"
                @change="generateDeckList()"
              />
              <div class="import-notice">
                <t-icon class="info-icon">
                  info-circle
                </t-icon>
                <span class="notice-info">Bulk import uses the MTGO plain text format.</span>
              </div>
            </t-tab-panel>
            <t-tab-panel>
              <div
                v-if="cardData.mainboard?.length"
                class="mainboard-preview"
              >
                <span class="quantity">
                  Mainboard
                  <span class="mx-0.5">–</span>
                  {{ quantity.mainboard }}
                  <span
                    v-if="cardData.mainboard.length > 1"
                    class="opacity-50"
                  >({{ new Set(cardData.mainboard).size }} unique)</span>
                </span>

                <div class="card-previews">
                  <t-card-preview
                    v-for="card in cardData.mainboard"
                    :key="card"
                    :card="card"
                  />
                </div>
              </div>
              <div
                v-if="cardData.sideboard?.length"
                :class="['sideboard-preview', cardData.mainboard.length ? 'mt-16' : '']"
              >
                <span class="quantity">
                  Sideboard
                  <span class="mx-0.5">–</span>
                  {{ quantity.sideboard }}
                  <span
                    v-if="cardData.sideboard.length > 1"
                    class="opacity-50"
                  >({{ cardData.sideboard.length }} unique)</span>
                </span>

                <div class="card-previews">
                  <t-card-preview
                    v-for="card in cardData.sideboard"
                    :key="card"
                    :card="card"
                  />
                </div>
              </div>
            </t-tab-panel>
          </template>
        </t-tab-group>
      </div>
      <div class="place-self-end">
        <t-button
          class="mb-4 absolute auto-cols-max top-0 right-0"
          variant="filled"
          :disabled="disablePreview || loading"
          @click="exportDeck()"
        >
          <t-icon class="mr-1">
            download-circle
          </t-icon>
          Export Deck
        </t-button>
        <a
          id="download"
          ref="download"
          class="hidden"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TButton from '../../../components/t-button/index.vue'
import TCardPreview from '../../../components/t-card-preview/index.vue'
import TIcon from '../../../components/t-icon/index.vue'
import TTab from '../../../components/t-tab-group/t-tab/index.vue'
import TTabGroup from '../../../components/t-tab-group/index.vue'
import TTabPanel from '../../../components/t-tab-group/t-tab-panel/index.vue'
import TTextarea from '../../../components/t-textarea/index.vue'
import { fetchCardData } from "../../../mixins/scryfall";
import { generateTabletopDeck } from "../../../mixins/tabletop";
import { generateRandomName } from "../../../mixins/name-generator";
import { toRaw } from "vue";
import { mapGetters } from 'vuex'

export default {
  name: "Deck",
  components: {
    TButton,
    TCardPreview,
    TIcon,
    TTab,
    TTabGroup,
    TTabPanel,
    TTextarea
  },
  data () {
    return {
      cardData: {},
      colorIdentity: [],
      decklist: '',
      loading: false,
      name: '',
      selectedTab: 0,
      tabletopDeck: {}
    }
  },
  computed: {
    ...mapGetters([
      'deck',
      'numericCards'
    ]),
    disablePreview () {
      return !this.loading && (!this.decklist || !Object.keys(this.cardData).length)
    },
    placeholder () {
      const cards = [
        '4 Kor Spiritdancer',
        '4 Hateful Eidolon',
        '4 Thoughtseize',
        '',
        'SIDEBOARD:',
        '1 Lurrus of the Dream Den'
      ]

      return cards.join("\n")
    },
    quantity () {
      const mainboardQuantity = this.cardData?.mainboard?.reduce((sum, { quantity }) => sum + quantity, 0)
      const sideboardQuantity = this.cardData?.sideboard?.reduce((sum, { quantity }) => sum + quantity, 0)

      return {
        mainboard: `${mainboardQuantity || 0} ${mainboardQuantity !== 1 ? 'cards' : 'card'}`,
        sideboard: `${sideboardQuantity || 0} ${sideboardQuantity !== 1 ? 'cards' : 'card'}`
      }
    }
  },
  mounted () {
    if (!this.numericCards) this.$store.dispatch('fetchNumericCards')
    const savedDeck = this.deck(this.$route.params.id)

    if (savedDeck) {
      this.name = savedDeck.name
      this.decklist = savedDeck.query
      this.generateDeckList()
    } else this.name = generateRandomName()

    window.document.title = `${this.name} | Nykthos, a deck generator for Tabletop Simulator`
  },
  methods: {
    createBoards () {
      let sideboardIndex = this.regexIndexOf(this.decklist,/SIDEBOARD:|SIDEBOARD/gmi)
      const deck = { mainboard: [], sideboard: [] }

      if (sideboardIndex > -1) {
        deck.sideboard = this.decklist.slice(sideboardIndex).split('\n').slice(1).filter(Boolean)
      } else sideboardIndex = undefined

      deck.mainboard = this.decklist.slice(0, sideboardIndex).split('\n').filter(Boolean)

      return deck
    },
    exportDeck () {
      const tabletopDeck = generateTabletopDeck(toRaw(this.cardData))

      const blob = new Blob([JSON.stringify(tabletopDeck)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const anchor = this.$refs.download

      this.$store.commit('saveDeck', {
        colorIdentity: this.colorIdentity,
        created: new Date().getTime(), // only saved once
        id: this.$route.params.id,
        name: this.name,
        quantity: this.quantity.mainboard || this.quantity.sideboard,
        query: this.decklist,
        updated: new Date().getTime()
      })

      anchor.href = url
      anchor.download = this.name
      anchor.click()
    },
    async generateDeckList () {
      this.cardData = {}
      const deck = this.parseDeckList()

      this.loading = true

      const data = fetchCardData(deck)

      try {
        const { cardData, colorIdentity } = await data

        this.cardData = cardData
        this.colorIdentity = colorIdentity
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    parseDeckList () {
      const boards = this.createBoards()
      const numericCards = this.$store.getters.numericCards
      const deck = { mainboard: [], sideboard: [] }

      Object.keys(boards).forEach(board => {
        const contents = Object.values(boards[board])

        contents.forEach(card => {
          let quantity;

          /* Check for quantity only if the current line doesn't exactly match a numeric card name */
          if (!numericCards.includes(card.toLowerCase())) {
            const quantityRegex = /^\d+x?/gm
            quantity = card.match(quantityRegex)
          }

          /* If quantity is provided, match everything after a space. Else match entire string.*/
          const cardRegex = quantity?.length ? /(?<=\s).*/gm : /.*/gm;
          const name = card.match(cardRegex)

          deck[board].push({
            quantity: Number(quantity?.[0].replace('x', '') || '1'),
            name: name?.filter(Boolean)?.join().replace(/\//g, '//')
          })
        })
      })

      return deck
    },
    regexIndexOf (str, regex) {
      return str.search(regex)
    }
  }
}
</script>

<style scoped>
  .deck-generator {
    @apply grid
  }

  .deck-generator-actions {
    @apply relative
  }

  .deck-name {
    @apply border-none text-2xl font-bold mb-8 rounded bg-transparent dark:text-white deck-name-focus
  }

  .deck-name-focus {
    @apply focus:ring-indigo-500 focus:border-indigo-500 focus:ring-2
  }

  .bulk-import {
    min-height: 165px;
  }

  .quantity {
    @apply text-indigo-800 dark:text-white text-sm
  }

  .card-previews {
    @apply grid grid-flow-row auto-cols-max place-items-center gap-x-4 gap-y-8 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6
  }

  .import-notice {
    @apply flex items-center mt-1
  }

  .info-icon {
    @apply text-indigo-600 dark:text-indigo-500 mr-1
  }

  .notice-info {
    @apply text-sm text-indigo-800 dark:text-white
  }
</style>
