<template>
  <div class="homeContainer">
    <!-- TopBg -->
    <div class="slider-bg"></div>

    <!-- 搜索栏 -->
    <van-sticky>
      <div class="search">
        <van-search ref="Mysearch" background="#fff0" shape="round" placeholder="男士毛衣" @focus="goSearchPage">
          <template #left>
            <div class="logoWrap">
              <img src="../assets/images/logo.png">
            </div>
          </template>
        </van-search>
      </div>
    </van-sticky>

    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in lunBoData" :key="item.img">
        <img :src="item.img">
      </van-swipe-item>
    </van-swipe>

    <!-- 九宫格 -->
    <van-grid column-num="5" icon-size="38px" :border="false">
      <van-grid-item v-for="item in gridDta" :key="item.id" :icon="item.src" :text="item.title" :to="item.to" />
    </van-grid>

    <!-- 商品列表 -->
    <van-divider :style="{ borderColor: '#969799', padding: '0 16px' }">
      推荐商品
    </van-divider>
    <div class="goodslist">
      <Goods v-for="item in goodsData" :key="item.id" :data="item" @goodsclick="goodsRouter"></Goods>
    </div>

    <!-- backTop -->
    <backtop :scrollTop="500"></backtop>
  </div>
</template>

<script>
// 导入数据接口
import { fetchLunbo, fetchGoods } from '../api/index'
// 导入图片
import img1 from '../assets/images/1.png'
import img2 from '../assets/images/2.png'
import img3 from '../assets/images/3.png'
import img4 from '../assets/images/4.png'
import img5 from '../assets/images/5.png'
import img6 from '../assets/images/6.png'
import img7 from '../assets/images/7.png'
import img8 from '../assets/images/8.png'
import img9 from '../assets/images/9.png'
import img10 from '../assets/images/more.png'
// 导入商品组件
import Goods from '../components/goods.vue'
// 导入backTop组件
import backtop from '../components/backTop.vue'
export default {
  data() {
    return {
      lunBoData: [],
      gridDta: [
        { id: 1, src: img1, title: '海淘超市', to: '/goodslist' },
        { id: 2, src: img2, title: '数码电器', to: '/goodslist' },
        { id: 3, src: img3, title: '海淘生鲜', to: '/goodslist' },
        { id: 4, src: img4, title: '充值缴费', to: '/goodslist' },
        { id: 5, src: img5, title: 'PLUS会员', to: '/goodslist' },
        { id: 6, src: img6, title: '领金贴', to: '/goodslist' },
        { id: 7, src: img7, title: '领券', to: '/goodslist' },
        { id: 8, src: img8, title: '海淘服饰', to: '/goodslist' },
        { id: 9, src: img9, title: '物流查询', to: '/goodslist' },
        { id: 10, src: img10, title: '更多', to: '/goodslist' },
      ],
      goodsData: [],
      page: 1,
      limit: 15,
      loading: false,
      finished: false,
    }
  },
  components: {
    Goods, backtop
  },
  methods: {
    // 获取轮播图数据
    async _fetchLunbo() {
      let { message } = await fetchLunbo()
      this.lunBoData = message
    },
    // 获取商品数据
    async _fetchGoods() {
      let { message } = await fetchGoods(this.page, this.limit)
      this.goodsData = message
      this.goodsData.length % 2 === 1 && this.goodsData.pop()
    },
    // 滑动页面顶部搜索栏背景变化
    scrollHandle() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      scrollTop >= 50
        ? this.$refs.Mysearch.style.backgroundColor = '#e43130'
        : this.$refs.Mysearch.style.backgroundColor = '#fff0'
    },
    // 每个商品路由跳转
    goodsRouter({ id }) {
      this.$router.push(`/goodsDetail/${id}`)
    },
    // 跳转到搜索页面
    goSearchPage() {
      this.$router.push('/search')
    }
  },
  created() {
    this._fetchLunbo()
    this._fetchGoods()
  },
  mounted() {
    document.addEventListener('scroll', this.scrollHandle)
  },
  destroyed() {
    document.removeEventListener('scroll', this.scrollHandle)
  }
}
</script>
<style lang="scss">
.homeContainer {
  position: relative;
  overflow: hidden;

  // 搜索
  .search {
    display: flex;
    align-content: center;
    align-items: center;

    .logoWrap {
      width: 45px;
      height: 45px;

      img {
        width: 100%;
        height: 100%;
        transform: scale(.7);
      }
    }

    .van-search {
      flex: 1;
      padding: 0 10px 0 0;
      z-index: 999;
    }
  }

  // TopBg
  .slider-bg {
    background-image: linear-gradient(0deg, #f1503b, #c82519 50%);
    position: absolute;
    top: 0;
    left: -25%;
    height: 135px;
    width: 150%;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
  }

  // 轮播图
  .my-swipe {
    width: 95%;
    height: 160px;
    overflow: hidden;
    border-radius: 8px;
    margin: 5px auto;

    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;
      background-color: #39a9ed;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  // 九宫格
  .van-grid {
    margin: 20px auto;

    .van-grid-item__content {
      background-color: #f6f6f600;
      padding: 6px 6px;
    }
  }

}
</style>

