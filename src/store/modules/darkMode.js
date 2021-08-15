export default {
  state: {
    darkMode: false
  },
  getters: {
    darkMode (state) {
      return state.darkMode
    }
  },
  mutations: {
    toggleDarkMode (state) {
      state.darkMode = !state.darkMode
    }
  },
  actions: {
    toggleDarkMode (context) {
      context.commit('toggleDarkMode')
    }
  }
}
