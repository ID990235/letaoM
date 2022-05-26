<template>
  <div class="orderdetail-container">
    <div class="card">
      <div class="card_text">
        <p>订单编号：{{ orderInfo.order_id }}</p>
        <p>订单状态：{{ statusText }}</p>
      </div>
    </div>

    <div class="card">
      <van-steps>
        <van-step v-for="item in wuliuData" :key="item.time">
          <!-- <h3>{{ item.location }}</h3> -->
          <p>{{ item.time }}</p>
        </van-step>
      </van-steps>
    </div>

    <div class="card">
      <van-card v-for="item in goods" :key="item.id" :price="item.sell_price" :title="item.title"
        :thumb="item.thumb_path" />
    </div>

    <div class="card">
      <div class="card_text">
        <p>商品价格：&yen; {{ orderInfo.total_price }} 元</p>
        <p>配送费用：0 元</p>
        <p>实付金额：&yen; {{ orderInfo.actual_price }} 元</p>
        <p>支付方式：{{ orderInfo.pay_way }} 元</p>
      </div>
    </div>

    <div class="card">
      <div class="card_text">
        <p>下单日期：{{ orderInfo.add_time | timeFormat('YYYY-MM-DD HH:mm') }}</p>
        <div v-if="orderInfo.address_info">
          <p>收货地址：{{ addressText }}</p>
          <p>收货人名：{{ orderInfo.address_info.name + ' ' + orderInfo.address_info.tel }}</p>
        </div>
        <p>发货时间：不限送货时间</p>
        <p>发票类型：电子普通发票</p>
        <p>发票抬头：个人</p>
      </div>
    </div>

    <!-- 订单一些操作按钮 -->
    <div class="btns">
      <van-button size="mini" v-if="orderInfo.status === 0" @click="pay" type="danger">立即付款</van-button>
      <van-button size="mini" v-if="orderInfo.is_out === 0 && orderInfo.status === 1" type="danger">提醒发货
      </van-button>
      <template v-if="orderInfo.status === 2">
        <van-button size="mini" type="info">已完成</van-button>
        <van-button size="mini" type="info">去评价</van-button>
      </template>
    </div>
  </div>
</template>

<script>
import { fetchOrderDetail, fetchPayOrder, fetchWuliu } from "../api/order.js"
import { fetchCarGoods } from "../api/user.js"
export default {
  data() {
    return {
      order_id: this.$route.params.order_id,
      orderInfo: {},
      wuliuData: [],
      goods: [],
    }
  },
  created() {
    this._fetchOrderDetail()
    this.showWuliu()
  },
  methods: {
    async _fetchOrderDetail() {
      const orderInfo = await fetchOrderDetail(this.order_id)
      this.orderInfo = orderInfo
      // 要获取商品id需要慢订单一步
      this._fetchCarGoods()
    },
    // 查看物流
    async showWuliu() {
      // 判断之前是否已经有物流信息 
      // if (this.wuliuData.length !== 0) {
      //   // 有物流信息
      //   this.isShow = true
      //   return;
      // }
      // 获取物流接口
      let wuliuData = await fetchWuliu()
      this.wuliuData = wuliuData
    },
    async _fetchCarGoods() {
      let { message } = await fetchCarGoods(this.orderInfo.goods_ids)
      this.goods = message
    },
  },
  computed: {
    // 订单状态提示
    statusText() {
      let { is_take, is_out, status } = this.orderInfo;
      if (status === 0) return "未付款"

      if (status === 1 && is_out === 0) return "待发货"

      if (is_out === 1 && is_take === 0) return "您的包裹正在派送中"

      if (status === 2) return "已完成"
    },
    addressText() {
      let { province, city, country, addressDetail } = this.orderInfo.address_info
      return province + city + country + addressDetail
    }
  },
}
</script>

<style lang="scss" scoped>
.orderdetail-container {
  .card {
    margin-top: 10px;
    background-color: #ffffff;
    padding: 14px 21px;
  }

  .card:nth-child(1) {
    margin-top: 0px;
  }

  .card_text {
    font-size: 13px;

    p {
      color: #3C3C3C;
      line-height: 20px;
    }
  }

  .van-steps {
    p {
      width: 60px;
      text-align: center;
    }
  }

  .btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 60px;
    padding: 0 10px;
    box-shadow: 0 0 10px #ccc;
    background-color: #fafafa;
  }
}
</style>