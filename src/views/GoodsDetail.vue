<template>
  <div class="goodsDetail-container">
    <!-- 轮播图-摘要 -->
    <div class="card">
      <!-- 轮播图 -->
      <div @click="previewImage">
        <van-swipe @change="onChange" class="my-swipe" :autoplay="3000">
          <van-swipe-item v-for="image in images" :key="image.src">
            <img v-lazy="image.src" />
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">{{ current + 1 }}/{{ imglength }}</div>
          </template>
        </van-swipe>
      </div>
      <!-- 摘要 -->
      <div class="main_wrap">
        <div class="price_wrap">
          <span class="price">&yen;<i class="price_int">{{ goodsInfo.sell_price }}</i>.00</span>
          <span class="mk_price">&yen;{{ goodsInfo.market_price }}.00</span>
        </div>
        <div class="title_wrap">
          <b>{{ goodsInfo.title }}</b>
          <div class="as_info">
            <p class="ellipsis_line_2" ref="as_info">{{ goodsInfo.zhaiyao }}
              <van-icon name="arrow-up" @click="scaling()" />
            </p>
            <van-icon name="arrow-down" @click="scaling('unfold')" v-show="iconShow" />
          </div>
        </div>
      </div>
    </div>

    <!-- 商品介绍 -->
    <div class="card">
      <div class="goods_details">商品介绍</div>
      <div class="details_content" v-html="goodsInfo.content"></div>
    </div>

    <!-- tabbar -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" to="/home/shopcar" :badge="getCartNum" />
      <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" @click="skuShow('addCar')" />
      <van-goods-action-button color="#7232dd" type="danger" text="立即购买" @click="skuShow('buy')" />
    </van-goods-action>

    <!-- sku组件 -->
    <van-sku v-model="show" :sku="sku" :goods="goods" :goods-id="goodsInfo.id" :hide-stock="sku.hide_stock"
      :show-add-cart-btn="showAddCarBtn" @add-cart="addCart" @buy-clicked="buyClicked">
      <template #sku-messages>
        <div class="card">
          <van-divider>商品规格</van-divider>
          <span>商品货号：{{ goodsInfo.goods_no }}</span> |
          <span>库存：{{ goodsInfo.stock_quantity }}件</span> |
          <span>上架时间：{{ goodsInfo.add_time | dateFormat() }}</span>
        </div>
      </template>
    </van-sku>
    <!-- backTop -->
    <backtop :scrollTop="500"></backtop>
  </div>
</template>

<script>
import { fetchGoodsImages, fetchGoodsInfo } from '../api/index'
import { ImagePreview } from 'vant';
// 导入backTop组件
import backtop from '../components/backTop.vue'
// 导入vuex辅助函数
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      id: this.$route.params.id,
      iconShow: true,
      current: 0,
      images: [],
      imglength: null,
      goodsInfo: {},
      show: false,
      showAddCarBtn: false,
      sku: {
        // 数据结构见下方文档
        tree: [],
        price: "0.00", // 默认价格（单位元）
        stock_num: 18, // 商品总库存
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // picture: ''
      }
    }
  },
  components: {
    backtop
  },
  methods: {
    ...mapMutations(['addGoodsToCar']),
    onChange(index) {
      this.current = index;
    },
    scaling(value) {
      value == 'unfold'
        ? (this.$refs.as_info.classList.remove('ellipsis_line_2'), this.iconShow = false)
        : (this.$refs.as_info.classList.add('ellipsis_line_2'), this.iconShow = true)
    },
    async _fetchGoodsImages() {
      let { message } = await fetchGoodsImages(this.id)
      this.images = message
      this.imglength = message.length
      // 赋值给sku商品图片
      this.goods.picture = message.length && message[0].src
    },
    async _fetchGoodsInfo() {
      let { message } = await fetchGoodsInfo(this.id)
      this.goodsInfo = message;
      this.sku.price = message.sell_price;
      this.sku.stock_num = message.stock_quantity;
    },
    previewImage() {
      // 图片预览
      let imgs = this.images.map(item => item.src);
      ImagePreview({
        images: imgs,
        startPosition: 0,
      });
    },
    skuShow(value) {
      this.show = true
      value == 'addCar' ? this.showAddCarBtn = true : this.showAddCarBtn = false
    },
    addCart(skudata) {
      let { goodsId, selectedNum } = skudata;
      let { sell_price: price, title, zhaiyao: content } = this.goodsInfo
      // const cartData = { price, title, content, id: goodsId, number: selectedNum, isCheck: true, pic: this.goods.picture }
      const cartData = { price, id: goodsId, number: selectedNum, isCheck: true }
      this.addGoodsToCar(cartData)
      this.show = false
      this.$toast.success('添加购物车');
    },
    buyClicked(skuData) {
      let { goodsId, selectedNum } = skuData;
      let { sell_price: price, title, zhaiyao: content } = this.goodsInfo
      const cartData = { price, id: goodsId, number: selectedNum, isCheck: true }
      this.addGoodsToCar(cartData)
      this.show = false
      this.$router.push('/home/shopcar')
    }
  },
  computed: {
    ...mapState(['cartData']),
    ...mapGetters(['getCartNum'])
  },
  created() {
    this._fetchGoodsImages()
    this._fetchGoodsInfo()
  }
}
</script>

<style lang="scss" scoped>
.goodsDetail-container {
  padding: 4px;

  .card {
    border-radius: 6px;
    margin-bottom: 8px;
    background: #fff;
    padding: 8px;
  }

  // 轮播图-摘要
  .my-swipe {
    position: relative;
    width: 100%;
    height: 310px;
    margin: 5px auto;

    .van-swipe-item {
      overflow: hidden;

      img {
        line-height: 100%;
        max-height: 100%;
        max-width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
      }
    }

    .custom-indicator {
      position: absolute;
      right: -1px;
      bottom: 5px;
      padding: 2px 10px;
      font-size: 15px;
      background: rgba(0, 0, 0, 0.1);
      color: #fff;
      border-radius: 10px 0 0 10px;
      height: 16px;
      line-height: 16px;
      font-size: 9px;
    }
  }

  .main_wrap {
    padding: 10px 4px 0;

    .price_wrap {
      padding: 5px 0;

      .price {
        font-family: JDZH-Regular, sans-serif;
        font-size: 17px;
        color: #ff4142;
      }

      .price_int {
        font-size: 25px;
      }

      .mk_price {
        font-size: 14px;
        margin-left: 5px;
        color: #999999;
        text-decoration: line-through;
      }
    }

    .title_wrap {
      position: relative;
      padding: 5px 0;

      .as_info {
        position: relative;
      }

      p {
        padding: 0 30px 0 0;
        font-size: 13px;
        text-align: justify;
        letter-spacing: -0.60px;
      }

      .van-icon-arrow-down {
        position: absolute;
        right: 10px;
        top: 0px;
      }
    }
  }

  // 商品介绍
  .goods_details {
    text-align: center;
    font-weight: 700;
  }

  .details_content {
    ::v-deep table {
      width: 100%;
      height: 100%;
    }

    ::v-deep img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>