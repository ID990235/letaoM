import Vue from 'vue'
import myaxios from '../api/request.js'
import axios from 'axios'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

Vue.use({
  install(Vue) {
    Vue.prototype.$axios = myaxios
    Vue.prototype.$httpGet = function (url) {
      return axios.get(url)
    }
    Vue.prototype.$httpPost = function (url) {
      return axios.post(url)
    }

    Vue.prototype.$bus = new Vue();
  }
})