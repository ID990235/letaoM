<template>
  <div class="backTop" v-show="isShow" @click="goTop">
    <slot>
      <img src="../assets/images/backtop.png">
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    scrollTop: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    scrollHandle() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      scrollTop >= this.scrollTop ? this.isShow = true : this.isShow = false
    },
    goTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    }
  },
  mounted() {
    document.addEventListener('scroll', this.scrollHandle)
  },
  destroyed() {
    document.removeEventListener('scroll', this.scrollHandle)
  }
}
</script>

<style lang="scss" scoped>
.backTop {
  position: fixed;
  right: 8px;
  bottom: 120px;
  width: 38px;
  height: 38px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>