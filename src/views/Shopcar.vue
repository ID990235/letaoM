<template>
  <div>
    <!-- 购物车提示UI界面 -->
    <van-empty description="你的购物车空空如也" :image="carImg" v-if="getCartNum == 0">
      <van-button round type="danger" class="bottom-button" to="/home/index">去首页</van-button>
    </van-empty>

    <div v-for="(item, index) in cartData" :key="item.id" class="goods_item">
      <van-swipe-cell>
        <van-card :desc="item.content" :num="item.number" :title="item.title" class="goods-card" :thumb="item.pic">
          <template #price>
            <div class="price">&yen;<span class="price_int">{{ item.price }}</span></div>
          </template>
          <template #footer>
            <van-stepper min="0" :default-value="item.number" theme="round" button-size="22" disable-input
              @change="_revisalNum" :name="index" />
          </template>
        </van-card>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @touchstart="_removeGoods(index)" />
        </template>
      </van-swipe-cell>
      <div class="ck_wrap">
        <van-checkbox class="ck_item" v-model="$store.getters.getIsCheck[index]"
          @click="_setItemCheck(index, getIsCheck[index])" />
      </div>
    </div>

    <van-submit-bar class="mb50" :price="getTotalPrice * 100" button-text="提交订单" tip="仅支持微信支付">
      <van-checkbox class="allCheck" :value="getAllCheck" @click="_allCheck">全选</van-checkbox>
      <template>总计 {{ getTotalNum }} 件</template>
    </van-submit-bar>
  </div>
</template>

<script>
import carImg from '../assets/images/car.png'
// 导入vuex辅助函数
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
  name: 'Shopcar',
  data() {
    return {
      carImg,
      allSelected: true
    }
  },
  computed: {
    ...mapGetters(['getCartNum', 'getIsCheck', 'getAllCheck', 'getTotalPrice', 'getTotalNum']),
    ...mapState(['cartData'])
  },
  methods: {
    ...mapMutations(['revisalNum', 'removeGoods', 'setItemCheck', 'allCheck']),
    // 修改商品数量
    _revisalNum(num, { name: index }) {
      this.revisalNum({ num, index })
    },
    // 删除商品
    _removeGoods(index) {
      this.removeGoods(index)
    },
    // 设置单选状态
    _setItemCheck(index, check) {
      this.setItemCheck({ index, check })
    },
    // 设置全选状态
    _allCheck() {
      this.allSelected = !this.allSelected
      this.allCheck(this.allSelected)
    }
  }
}
</script>
<style lang="scss" scoped>
.mb50 {
  margin-bottom: 50px;
}

.bottom-button {
  width: 160px;
  height: 40px;
}

.goods_item {
  margin-bottom: 15px;

  .goods-card {
    margin: 0;
    background-color: #fff;

    .price {
      color: red;
    }

    .price_int {
      font-size: 20px;
    }
  }

  .delete-button {
    height: 100%;
  }

  .ck_wrap {
    margin-left: 5px;
    background-color: #fff;

    .ck_item {
      width: 22px
    }
  }
}

.allCheck {
  margin-right: 4px
}
</style>