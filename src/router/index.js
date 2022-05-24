import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import store from '../store/index'
import { Dialog } from 'vant'

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
            backRouter: '/home',
          }
        },
        {
          path: 'user',
          component: () => import('../views/User.vue'),
          meta: {
            name: 'user',
            title: '我的',
            isShowNavbar: true,
            requireAuth: true,
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
    {
      path: "/login",
      component: () => import('../views/Login.vue'),
      meta: {
        name: "login",
        isShowNavbar: false,
        title: '登录',
      }
    },
    {
      path: "/register",
      component: () => import('../views/Register.vue'),
      meta: {
        name: "register",
        isShowNavbar: false,
        title: '注册'
      }
    },
    {
      path: "/myaddress",
      component: () => import('../views/Myaddress.vue'),
      meta: {
        name: "myaddress",
        isShowNavbar: false,
        title: '我的地址',
        requireAuth: true,
      }
    },
    {
      path: "/addAddress",
      component: () => import('../views/Addaddress.vue'),
      meta: {
        name: "addAddress",
        isShowNavbar: false,
        title: '添加地址',
        requireAuth: true,
      }
    },
    {
      path: "/editAddress/:addressInfo",
      component: () => import('../views/Editaddress.vue'),
      meta: {
        name: "editAddress",
        isShowNavbar: false,
        title: '编辑地址',
        requireAuth: true,
      }
    },
    {
      path: "/search",
      component: () => import('../views/Search.vue'),
      meta: {
        name: "search",
        isShowNavbar: true
      }
    },
  ]
})

NProgress.configure({
  showSpinner: false,
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  // 判断需要校验的路由
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login?redirect=' + to.fullPath
      })
    }
  } else {
    next();
  }

})

router.afterEach((to, from) => {
  NProgress.done();
})

export default router