import { getNumericCards } from "../../mixins/scryfall";

export default {
  state: {
    numericCards: []
  },
  getters: {
    numericCards (state) {
      return state.numericCards
    }
  },
  mutations: {
    setNumericCards (state, payload) {
      state.numericCards = payload
    }
  },
  actions: {
    async fetchNumericCards (context) {
      const numericCards = await getNumericCards()

      context.commit('setNumericCards', numericCards)
    }
  }
}
