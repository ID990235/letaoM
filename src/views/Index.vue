<template>
  <div>

    <van-tabbar v-model="active" active-color="#ee0a24" z-index="1000">
      <van-tabbar-item icon="home-o" to="/home/index">首页</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/home/shopcar" :badge="getCartNum">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/home/user">我的</van-tabbar-item>
    </van-tabbar>

    <!--匹配三个子路由  子路由需要在父路由页面下使用  -->
    <keep-alive exclude="shopcar">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
// 导入vuex辅助函数
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    ...mapGetters(['getCartNum'])
  },
  watch: {
    $route: {
      handler(newVal) {
        let { name } = newVal.meta
        let objMap = {
          'home': 0,
          'shopcar': 1,
          'user': 2,
        }
        this.active = objMap[name]
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss">
.van-tabbar {
  min-width: 320px;
  max-width: 750px;
  left: 50%;
  transform: translate(-50%);
}
</style>

