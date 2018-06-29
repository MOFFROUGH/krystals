import Vue from 'vue'

import axios from 'axios'
Vue.prototype.$axios = axios

export default
axios.create({
  baseURL: 'https://mymathkings.com/escorts/server/vixens/'
})
