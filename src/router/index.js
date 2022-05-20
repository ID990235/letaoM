import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

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
            title: '购物车',
            isShowNavbar: false,
            backRouter: '/home'
          }
        },
        {
          path: 'user',
          component: () => import('../views/User.vue'),
          meta: {
            name: 'user',
            title: '我的',
            isShowNavbar: true
          }
        },
      ]
    },
    {
      path: '/goodslist',
      component: () => import('../views/GoodsList.vue'),
      meta: {
        name: 'goodslist',
        title: '海淘超市',
      }
    },
    {
      path: '/goodsdetail/:id',
      component: () => import('../views/GoodsDetail.vue'),
      meta: {
        name: 'goodsdetail',
        title: '商品详情',
        isShowNavbar: false,
      }
    },
  ]
})

NProgress.configure({
  showSpinner: false,
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
})

router.afterEach((to, from) => {
  NProgress.done();
})

export default router