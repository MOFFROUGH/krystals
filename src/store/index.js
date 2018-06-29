import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
Vue.use(Vuex)
import api from './../services/api'

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
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
    images: [
      // {vixen: 'cate', email: 'cate@cate.com', location: 'manhattan', type: 'blonde', src: '/static/img/images-n3.jpg', age: 23, inParty: false, id: 12},
      // {vixen: 'Angela', email: 'cate@cate.com', location: 'Bronx', type: 'Asian', src: '/static/img/images-n4.jpg', age: 23, inParty: false, id: 13},
      // {vixen: 'Maggie', email: 'cate@cate.com', location: 'Bronx', type: 'Brunette', src: '/static/img/images-n5.jpg', age: 23, inParty: false, id: 14},
      // {vixen: 'Ann', email: 'cate@cate.com', location: 'Bronx', type: 'Ebony', src: '/static/img/images-n6.jpg', age: 23, inParty: false, id: 15},
      // {vixen: 'Janet', email: 'cate@cate.com', location: 'manhattan', type: 'Blonde', src: '/static/img/images-n7.jpg', age: 23, inParty: false, id: 16},
      // {vixen: 'Jade', email: 'cate@cate.com', location: 'Bronx', type: 'blonde', src: '/static/img/images-n8.jpg', age: 23, inParty: false, id: 17}
    ],
    partyVixens: [],
    loading: false,
    vixenloading: false,
    consent: false,
    officialservices: [
      {payment: '2000', duration: 'nights', id: 1, icon: 'star', budget: 'Ksh. 2000', timefor: '/1 night gfe '},
      {payment: '7000', duration: 'weekends', id: 2, icon: 'star', budget: 'Ksh. 7000', timefor: '/1 weekend gfe'},
      {payment: '10000', duration: 'weeks', id: 3, icon: 'star', budget: 'Ksh. 10000', timefor: '/1 week gfe'}
      // {payment: '3000', duration: 'days', id: 4, icon: 'star', budget: 'Ksh. 3000', timefor: '/ day for business trip gfe'}
    ],
    casualservices: [
      {payment: '200', duration: 'hour', id: 1, icon: 'star', budget: 'Ksh. 200', timefor: '/1 hour '},
      {payment: '350', duration: 'hours', id: 2, icon: 'star', budget: 'Ksh. 350', timefor: '/2 hours '},
      {payment: '1000', duration: 'night', id: 3, icon: 'star', budget: 'Ksh. 1000', timefor: '/1 night '}
    ],
    OneVixenImages: null
  },
  mutations: {
    setImages (state, payload) {
      // var id = state.images.length + 1
      var found = state.images.some(function (el) {
        return el.vixen === payload.vixen
      })
      if (!found) {
        state.images.push(payload)
      }
    },
    setPartyVixens (state, payload) {
      state.partyVixens.push(payload)
    },
    setOneVixenImages (state, payload) {
      state.OneVixenImages = payload
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
        for (var i = 0; i < obj.length; i++) {
          let Allimages = {
            id: obj[i].id,
            src: obj[i].src,
            vixen: obj[i].name,
            location: obj[i].location,
            type: obj[i].type,
            class: 'diamond',
            icon: 'gem',
            color: 'blue',
            interests: 'clubbing and going out',
            age: parseInt(obj[i].age)
          }
          commit('setImages', Allimages)
        }
        console.log(obj)

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
    setOneVixenImages ({commit, state}, id) {
      commit('setVixenLoading', true)
      // console.log('clicked')
      api.get('images/' + id)
      .then(res => {
        const Allimages = []
        const obj = res.data.images
        for (var i = 0; i < obj.length; i++) {
          Allimages.push({
            id: obj[i].id,
            src: obj[i].imageURL,
            icon: 'star'
          })
        }
        // this.imagesVixen = Allimages
        // console.log(Allimages)
        commit('setOneVixenImages', Allimages)
        commit('setVixenLoading', false)
      }).catch(error => {
        console.log(error)
        commit('setVixenLoading', false)
      })
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
