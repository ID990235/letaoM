import Vue from 'vue'
import App from './App.vue'

import './Vantui.js'
import './assets/css/normalize.css'
import './assets/css/common.scss'
import '../node_modules/nprogress/nprogress.css'

import router from './router/index'
import './Vueuse/index'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')