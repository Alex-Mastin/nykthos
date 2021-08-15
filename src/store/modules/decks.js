export default {
  state: {
    decks: []
  },
  getters: {
    deck: (state) => (id) => {
      return state.decks.find(deck => deck.id === id)
    },
    decks (state) {
      return state.decks
    }
  },
  mutations: {
    deleteDeck (state, payload) {
      // splice deck from decks by id
    },
    saveDeck (state, payload) {
      if (state.decks.length) {
        const deck = state.decks.find(deck => deck.id === payload.id)
        const index = state.decks.indexOf(deck)

        if (index !== -1) {
          payload.date = state.decks[index].date

          state.decks[index] = payload
          return
        }
      }

      state.decks.push(payload)
    }
  },
  actions: {
    // async fetchNumericCards (context) {
    //   const numericCards = await getNumericCards()
    //
    //   context.commit('setNumericCards', numericCards)
    // }
  }
}
