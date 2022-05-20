<template>
  <div class="goodsDetail-container">
    <div class="card" @click="previewImage">
      <van-swipe @change="onChange" class="my-swipe" :autoplay="3000">
        <van-swipe-item v-for="image in images" :key="image.src">
          <img v-lazy="image.src" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/{{ imglength }}</div>
        </template>
      </van-swipe>
    </div>


    <backtop :scrollTop="100"></backtop>
  </div>
</template>

<script>
import { fetchGoodsImages } from '../api/index'
import { ImagePreview } from 'vant';
// 导入backTop组件
import backtop from '../components/backTop.vue'
export default {
  data() {
    return {
      id: this.$route.params.id,
      current: 0,
      images: [],
      imglength: null,
    }
  },
  components: {
    backtop
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    async _fetchGoodsImages() {
      let { message } = await fetchGoodsImages(this.id)
      this.images = message
      this.imglength = message.length
      // 赋值给sku商品图片
      // this.goods.picture = message.length && message[0].src
    },
    previewImage() {
      // 图片预览
      let imgs = this.images.map(item => item.src);
      ImagePreview({
        images: imgs,
        startPosition: 1,
      });
    },
  },
  created() {
    this._fetchGoodsImages()
    // this._fetchGoodsInfo()
  }
}
</script>

<style lang="scss" scoped>
.goodsDetail-container {
  height: 100vh;
  padding: 4px;

  .card {
    border-radius: 6px;
    margin-bottom: 8px;
    background: #fff;
    padding: 8px;
  }

  .my-swipe {
    width: 100%;
    height: 215px;
    overflow: hidden;
    margin: 5px auto;

    .van-swipe-item {
      text-align: center;
      color: #fff;

      img {
        height: 100%;
      }
    }

    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>