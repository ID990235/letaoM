<template>
  <div class="shopcar-container">

    <!-- 收获地址 -->
    <div v-if="cartGoodslist.length" class="addressWrap" @click="$router.push('/myaddress')">
      <div v-if="hasAddress" class="address">
        <van-icon name="location-o" />
        <div class="info">
          <p>收货人名：{{ address.name + ' ' + address.tel }} 邮编: {{ address.postalCode }}</p>
          <p>收获地址：{{ textAddress }}</p>
        </div>
      </div>
      <!-- 无设置收货地址 -->
      <van-button v-else block type="info" @click="$router.push('/addaddress')" plain>添加地址</van-button>
    </div>

    <!-- 购物车提示UI界面 -->
    <van-empty description="你的购物车空空如也" :image="carImg" v-if="getCartNum == 0">
      <van-button round type="danger" class="bottom-button" to="/home/index">去首页</van-button>
    </van-empty>

    <div v-for="(item, index) in cartGoodslist" :key="item.id" class="goods_item">
      <van-swipe-cell>
        <van-card :num="getGoodNum[item.id]" :title="item.title" class="goods-card" :thumb="item.thumb_path">
          <template #price>
            <div class="price">&yen;<span class="price_int">{{ item.sell_price }}</span></div>
          </template>
          <template #footer>
            <van-stepper min="0" :default-value="getGoodNum[item.id]" button-size="22" disable-input
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

    <van-submit-bar @submit="orderCommit" style="bottom:50px;" :price="getTotalPrice * 100" button-text="提交订单"
      :disabled="isDisabled">
      <van-checkbox class="allCheck" :value="getAllCheck" @click="_allCheck">全选</van-checkbox>
      <template>总计 {{ getTotalNum }} 件</template>
    </van-submit-bar>

    <!-- backTop -->
    <backtop></backtop>
  </div>
</template>

<script>
import carImg from '../assets/images/car.png'
import { fetchCartGoods } from '../api/index'
import { fetchGetUserAddress } from "../api/address.js"
import { fetchCommitOrder } from "../api/order.js"
// 导入vuex辅助函数
import { mapGetters, mapState, mapMutations } from 'vuex'
// 导入backTop组件
import backtop from '../components/backTop.vue'
import { genOrderId } from '../utils/tools'
export default {
  name: 'shopcar',
  data() {
    return {
      carImg,
      cartGoodslist: [],
      address: {},
      hasAddress: false, // hasAddress 记录是否有地址
    }
  },
  components: {
    backtop
  },
  computed: {
    ...mapGetters(['getCartNum', 'getIsCheck', 'getAllCheck', 'getTotalPrice', 'getTotalNum', 'getGoodNum', 'getGoodsid', 'getSelectGoodIds']),
    ...mapState(['cartData', 'allSelected']),
    textAddress() {
      let { province, city, country, addressDetail } = this.address
      return `${province}/${city}/${country}/${addressDetail}`
    },
    isDisabled() {
      // 没有地址或者总数量为0则提交按钮不可点击
      if (this.hasAddress === false || this.getTotalNum === 0) {
        return true
      }
      return false
    }
  },
  methods: {
    ...mapMutations(['revisalNum', 'removeGoods', 'setItemCheck', 'allCheck', 'clearUserInfo', 'clearCartData']),
    // 修改商品数量
    _revisalNum(num, { name: index }) {
      this.revisalNum({ num, index })
    },
    // 删除商品
    _removeGoods(index) {
      this.removeGoods(index)
      this.cartGoodslist.splice(index, 1)
    },
    // 设置单选状态
    _setItemCheck(index, check) {
      this.setItemCheck({ index, check })
    },
    // 设置全选状态
    _allCheck() {
      this.allCheck()
    },
    // 通过所添加的商品id 获取对应数据渲染购物车
    async _fetchCartGoods() {
      let ids = this.getGoodsid
      let { message } = await fetchCartGoods(ids)
      this.cartGoodslist = message.reverse()
    },
    // 获取用户地址
    async getUserAddress() {
      let user_id = this.$store.state.userInfo.id;
      if (!user_id) {
        this.$dialog.alert({
          message: '请先登录哦'
        }).then(() => {
          this.$router.push('/login')
        })
        return
      }

      if (user_id && this.cartData.length !== 0) {

        let result = await fetchGetUserAddress(user_id);
        // 判断用户是否有添加收货地址
        if (result.length === 0) {
          this.hasAddress = false
          this.$dialog({
            message: '请完善收货地址'
          })
          return;
        } else {
          this.hasAddress = true
        }

        // 只有一个地址默认地址就是本身
        if (result.length === 1) {
          this.address = result[0];
          return
        }

        // 有多个地址 但没有默认地址  默认选中第一个为默认地址
        let defaultAddress = result.find(item => item.isDefault == 1)
        defaultAddress ? this.address = defaultAddress : this.address = result[0]
      }
    },
    async orderCommit() {
      // 准备提交订单数据
      const user_id = this.$store.state.userInfo.id;
      console.log(this.getSelectGoodIds);
      const orderData = {
        user_id,
        order_id: genOrderId(),
        address_id: this.address.id,
        total_price: this.getTotalPrice,
        number: this.getTotalNum,
        goods_ids: this.getSelectGoodIds
      }

      this.$toast.loading({
        duration: 0,
        message: '提交订单中',
        forbidClick: true,
        overlay: true
      })

      // 提交订单接口
      const { message, status } = await fetchCommitOrder(orderData);
      this.$toast(message);

      // 下单成功清空购物车 跳转至订单页
      if (status === 0) {
        this.clearCartData()
        this.$router.replace('/order')
      }

      this.$toast.clear()
    }
  },
  created() {
    if (!this.getGoodsid) return
    this._fetchCartGoods()
    this.getUserAddress()
  }
}
</script>
<style lang="scss" scoped>
.shopcar-container {
  padding-bottom: 50px;

  .addressWrap {
    .address {
      display: flex;
      align-items: center;
      padding: 4px 10px;
      background-color: #fff;
      border-radius: 6px;
      margin: 6px 0;

      .van-icon {
        margin-right: 20px;
        color: red;
        font-size: 20px;
      }
    }

    .info {
      line-height: 20px;
    }
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
}
</style>