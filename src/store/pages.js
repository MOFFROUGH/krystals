const pages = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}
module.exports = pages
state: {
  QuickLinks: [
    {to: '/', id: 1, src: '/static/img/download.jpg', icon: 'home', title: 'Home'},
    {to: '/escorts', id: 2, src: '/static/img/images.jpg', icon: 'wc', title: 'Escorts'},
    {to: '/executive', id: 3, src: '/static/img/images1.jpg', icon: 'work', title: 'Executive'}
  ],  
  loading: false,
  officialservices: [
    {duration: 'nights', id: 1, icon: 'star', budget: '$ 2000', timefor: '/1 night gfe '},
    {duration: 'weekends', id: 2, icon: 'star', budget: '$ 7000', timefor: '/1 weekend gfe'},
    {duration: 'weeks', id: 3, icon: 'star', budget: '$ 10000', timefor: '/1 week gfe'},
    {duration: 'days', id: 4, icon: 'star', budget: '$ 3000', timefor: '/ day for mbusiness trip gfe'}
  ],
  OneVixenImages: null
},
mutations: {
  setImages (state, payload) {
    state.images = payload
  },
  setOneVixenImages (state, payload) {
    state.OneVixenImages = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  }
},
actions: {
  setImages ({commit}, payload) {
    commit('setLoading', true)
    commit('setImages', payload)
    commit('setLoading', false)
  },
  setLoading ({commit}, payload) {
    commit('setLoading', payload)
  },
  setOneVixenImages ({commit, state}, payload) {
    commit('setOneVixenImages', payload)
  }
},
getters: {
  getImages (state) {
    return state.images
  },
  getOne: (state) =>
  (imageid, cardid) => {
    var image = state.images.find(function (obj) {
      return obj.id === parseInt(imageid)
    })
    return image
  },
  getVixen: (state) => (id) => {
    var vixen = state.images.find(function (obj) {
      return obj.id === parseInt(id)
    })
    return vixen
  },
  getOfficialServices: (state) => {
    return state.officialservices
  },
  getExecService: (state) => (id) => {
    var vixen = state.officialservices.find(function (obj) {
      return obj.id === parseInt(id)
    })
    return vixen
  },
  getFeaturedVixens: (state, getters) => {
    return getters.getImages.slice(0, 4)
  },
  getLoading: (state) => {
    return state.loading
  }
}
