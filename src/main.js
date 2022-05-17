import Vue from 'vue'
import App from './App.vue'

import './Vantui.js'
import './assets/css/normalize.css'

import router from './router/index'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')