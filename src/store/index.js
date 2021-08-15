import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import darkMode from './modules/darkMode'
import decks from './modules/decks'
import scryfall from './modules/scryfall'

const store = createStore({
  plugins: [createPersistedState()],
  modules: {
    darkMode,
    decks,
    scryfall
  }
})

export default store
