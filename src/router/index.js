import Vue from 'vue'
import VueRouter from 'vue-router'

// import Index from '../views/Index.vue'
// import Home from '../views/Home.vue'
// import Shopcar from '../views/Shopcar.vue'
// import User from '../views/User.vue'

// 注册路由
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home/index'
    },
    {
      path: '/home',
      component: () => import('../views/Index.vue'),
      children: [
        {
          path: 'index',
          component: () => import('../views/Home.vue'),
          meta: {
            name: 'home',
            isShowNavbar: true
          }
        },
        {
          path: 'shopcar',
          component: () => import('../views/Shopcar.vue'),
          meta: {
            name: 'shopcar',
            isShowNavbar: true
          }
        },
        {
          path: 'user',
          component: () => import('../views/User.vue'),
          meta: {
            name: 'user',
            isShowNavbar: true
          }
        },
      ]
    },
    {
      path: '/goods',
      component: () => import('../views/Goods.vue'),
      meta: {
        title: '商品页',
        isShowNavbar: false
      }
    },
  ]
})

export default router