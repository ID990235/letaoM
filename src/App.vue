<template>
  <div class="app">
    <!-- 头部导航栏 navbar -->
    <van-sticky>
      <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="goBack" v-show="isShowNavbar" />
    </van-sticky>

    <!--匹配一切二级路由  -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowNavbar: false,
      title: '',
    }
  },
  watch: {
    '$route': {
      handler(newVal) {
        let { isShowNavbar, title } = newVal.meta
        this.isShowNavbar = !isShowNavbar
        this.title = title
      },
      // immediate: true
    }
  },
  methods: {
    goBack() {
      this.title == '购物车' ? this.$router.push('/home/index') : this.$router.back()
    }
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

