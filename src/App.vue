<template>
  <div class="app">
    <!-- 头部导航栏 navbar -->
    <van-sticky>
      <van-nav-bar :title="title" left-arrow @click-left="goBack" v-show="isShowNavbar" />
    </van-sticky>

    <!--匹配一切二级路由  -->
    <keep-alive exclude="orderdetail,search,SearchResult">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowNavbar: false,
      title: '',
      isOnLine: window.navigator.online,
    }
  },
  watch: {
    '$route': {
      handler(newVal, oldVal) {
        let { isShowNavbar, title } = newVal.meta
        this.isShowNavbar = !isShowNavbar
        this.title = title
      },
      // immediate: true
    },
    isOnLine(newVal) {
      newVal === true ? this.$toast.success('网络正常！') : this.$toast.fail('网络中断！')
    }
  },
  methods: {
    goBack() {
      this.title == '购物车' ? this.$router.push('/home/index') : this.$router.back();
    },
    updateNetworkStatu(e) {
      let { type } = e
      this.isOnLine = type === 'online' ? true : false
    }
  },
  mounted() {
    window.addEventListener('online', this.updateNetworkStatu)
    window.addEventListener('offline', this.updateNetworkStatu)
  }
}
</script>
<style lang="scss">
.app {
  min-width: 320px;
  max-width: 750px;
  margin: 0 auto;
  padding-bottom: 50px;
}
</style>

