// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import {store} from './store'
import App from './App'
import router from './router'
import lodash from 'lodash'
import VueLodash from 'vue-lodash'
// import PayPal from 'vue-paypal-checkout'
import VueLightbox from 'vue-lightbox'

import('vuetify/dist/vuetify.min.css')
var SocialSharing = require('vue-social-sharing')
import Lightbox from 'vue-easy-lightbox'
Vue.use(Lightbox)
// Vue.component('Paypal', PayPal)
Vue.component('Lightbox', VueLightbox)

Vue.use(VueLodash, lodash)
Vue.use(SocialSharing)
Vue.use(Vuetify, { theme: {
  primary: '#AB47BC',
  secondary: '#EA80FC',
  accent: '#43A047',
  error: '#f44336',
  warning: '#FDD835',
  info: '#448AFF',
  success: '#66BB6A'
}})

Vue.config.productionTip = false
Vue.config.silent = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
