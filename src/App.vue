<template>
  <div class="app">
    <!-- 头部导航栏 navbar -->
    <van-nav-bar :title="title" left-text="返回" right-text="按钮" left-arrow @click-left="$router.back()"
      v-show="isShowNavbar" />

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
  }
}
</script>
<style lang="scss">
.app {
  min-width: 320px;
  max-width: 750px;
  margin: 0 auto;
}
</style>

