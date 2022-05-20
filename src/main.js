import Vue from 'vue'
import App from './App.vue'

// 导入vantUI组件库
import './Vantui.js'
// 导入css样式
import './assets/css/normalize.css'
import './assets/css/common.scss'
import '../node_modules/nprogress/nprogress.css'
// 导入vuex状态管理
import store from './store/index'

import router from './router/index'
import './Vueuse/index'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')