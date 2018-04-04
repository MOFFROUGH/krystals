const users = {

  state: {
    images: null,
    OneVixenImages: null
  },

  mutations: {
    setImages (state, payload) {
      state.images = payload
    },
    setOneVixenImages (state, payload) {
      state.OneVixenImages = payload
    }
  },

  actions: {
    setImages ({commit}, payload) {
      commit('setLoading', true)
      commit('setImages', payload)
      commit('setLoading', false)
    },
    setOneVixenImages ({commit, state}, payload) {
      commit('setOneVixenImages', payload)
    }
  },
  getters: {
    getImages (state) {
      return state.images
    }
  }
}
module.exports = users
