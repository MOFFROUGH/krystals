import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
Vue.use(Vuex)
import api from './../services/api'

const vuexLocalStorage = new VuexPersist({
  key: 'escorts', // The key to store the state on in the storage provider.
  storage: window.localStorage // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

export const store = new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    QuickLinks: [
      {to: '/', id: 1, src: '/static/img/download.jpg', icon: 'home', title: 'Home'},
      {to: '/executive', id: 3, src: '/static/img/images1.jpg', icon: 'work', title: 'Escorts'}
    ],
    images: [],
    partyVixens: [],
    loading: false,
    vixenloading: false,
    consent: true,
    officialservices: [],
    OneVixenImages: null
  },
  mutations: {
    setImages (state, payload) {
      // var id = state.images.length + 1
      var found = state.images.some(function (el) {
        return el.vixen === payload.vixen
      })
      if (!found) {
        state.images = payload
      }
    },
    setPartyVixens (state, payload) {
      state.partyVixens.push(payload)
    },
    setOneVixenImages (state, payload) {
      state.OneVixenImages = payload
    },
    setExecutiveServices (state, payload) {
      state.officialservices = payload
    },
    setLoading (state, payload) {
      state.vixenloading = payload
    },
    setVixenLoading (state, payload) {
      state.vixenloading = payload
    },
    setConsent (state, payload) {
      state.consent = payload
    },
    setInParty (state, payload) {
      // get the hotel item with id given
      var Vixen = state.images.find(function (obj) {
        return obj.id === parseInt(payload)
      })
      Vixen.inParty = true
      // set the in Party method as true
    },
    setNotInParty (state, payload) {
      // get the hotel item with id given
      var Vixen = state.images.find(function (obj) {
        return obj.id === parseInt(payload)
      })
      Vixen.inParty = false
      // set the in cart method as true
    }
  },
  actions: {
    setImages ({commit}) {
      commit('setLoading', true)
      api.get('images')
      .then(res => {
        // const Allimages = {}
        const obj = res.data.images
        let images = []
        for (var i = 0; i < obj.length; i++) {
          let Allimages = {
            id: parseInt(obj[i].id),
            src: obj[i].src,
            vixen: obj[i].name,
            location: obj[i].location,
            type: obj[i].type,
            class: 'diamond',
            icon: 'gem',
            color: 'blue',
            inParty: false,
            interests: obj[i].description,
            age: parseInt(obj[i].age),
            imageShow: false
          }
          images.push(Allimages)
          // console.log(Allimages)
        }
        commit('setImages', images)
        // console.log(obj)

        commit('setLoading', false)
        // console.log(res.data)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
        // this.$store.dispatch('setLoading', false)
      })
    },
    setPartyVixens ({state, commit}, id) {
      var vixen = state.images.find(function (obj) {
        return obj.id === parseInt(id)
      })
      commit('setPartyVixens', vixen)
      commit('setInParty', id)
    },
    setImagesSearch ({commit}, payload) {
      commit('setImages', payload)
    },
    setLoading ({commit}, payload) {
      commit('setLoading', payload)
    },
    setConsent ({commit}, payload) {
      if (!window.localStorage.getItem('consent')) {
        commit('setConsent', false)
      } else {
        commit('setConsent', true)
      }
    },
    setOneVixenImagesNull ({commit}) {
      commit('setOneVixenImages', null)
    },
    setOneVixenImages ({commit, state}, id) {
      state.loading = true
      api.get('images/' + id)
      .then(res => {
        commit('setOneVixenImages', res.data.images)
      })
      .catch(error => {
        console.log(error)
      })
      state.loading = false
    },
    setExecutiveServices ({commit, state}, id) {
      state.loading = true
      api.get('services')
      .then(res => {
        commit('setExecutiveServices', res.data.services)
      })
      .catch(error => {
        console.log(error)
      })
      state.loading = false
    }
  },
  getters: {
    getImages (state) {
      return state.images
    },
    getPartyVixens (state) {
      return state.partyVixens
    },
    getOne: (state) =>
    (imageid) => {
      state.loading = true
      var image = state.images.find(function (obj) {
        return obj.id === parseInt(imageid)
      })
      state.loading = false
      return image
    },
    getVixen: (state) => (id) => {
      var vixen = state.images.find(function (obj) {
        return obj.id === parseInt(id)
      })
      state.loading = false
      return vixen
    },
    showImage: (state) => (id) => {
      var vixen = state.images.find(function (obj) {
        return obj.id === parseInt(id)
      })
      vixen.imageShow = true
    },
    hideImage: (state) => (id) => {
      var vixen = state.images.find(function (obj) {
        return obj.id === parseInt(id)
      })
      vixen.imageShow = false
    },
    getOfficialServices: (state) => {
      return state.officialservices
    },
    getCasualServices: (state) => {
      return state.casualservices
    },
    getExecService: (state) => (id) => {
      state.loading = true
      var vixen = state.officialservices.find(function (obj) {
        return obj.id === parseInt(id)
      })
      state.loading = false
      return vixen
    },
    getCasService: (state) => (id) => {
      state.loading = true
      var vixen = state.casualservices.find(function (obj) {
        return obj.id === parseInt(id)
      })
      state.loading = false
      return vixen
    },
    getFeaturedVixens: (state, getters) => {
      return getters.getImages.slice(0, 4)
    },
    getLoading: (state) => {
      return state.vixenloading
    }
  }
})
