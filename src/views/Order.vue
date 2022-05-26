<template>
  <div>
    <van-tabs v-model="active" @click="tabsClick">

      <van-tab v-for="item in orderTabs" :key="item.title" :title="item.title">
        <div v-for="item in filterOrderGoods" :key="item.id" style="margin-top:8px;"
          @click="$router.push('/orderdetail/' + item.order_id)">
          <div class="order_goods_hd">
            <div class="hd_left">
              <div class="ht_logo"><img src="../assets/images/logo.png"><span>海淘商城</span></div>
            </div>
          </div>
          <van-card :num="item.number" :price="item.goodsInfo.message[0].sell_price" :desc="item.pay_way"
            :title="item.goodsInfo.message[0].title" :thumb="item.goodsInfo.message[0].thumb_path">
            <template #tags>
              <span>下单时间：{{ item.add_time | timeFormat() }}</span>
            </template>
            <template #footer>
              <van-button size="mini" type="danger" v-if="item.status === 0">立即付款</van-button>
              <van-button size="mini" type="primary" v-if="item.is_out === 1">物流信息</van-button>
              <van-button size="mini" type="primary" v-if="item.is_out === 1" v-clipboard:copy="item.order_id"
                v-clipboard:success="copy">复制订单号
              </van-button>
              <template v-if="item.status === 2">
                <van-button size="mini" type="info">已完成</van-button>
                <van-button size="mini" type="warning">评价</van-button>
              </template>
              <van-button size="mini" type="danger" v-if="item.status === 0">客服</van-button>
            </template>
          </van-card>
        </div>
      </van-tab>

    </van-tabs>
    <backtop></backtop>
  </div>
</template>

<script>
import { fetchUserOrder } from '../api/order'
import { fetchCartGoods } from '../api/index'
// 导入backTop组件
import backtop from '../components/backTop.vue'
export default {
  data() {
    return {
      active: 0,
      orderTabs: [
        { title: "全部", status: "all" },
        { title: "未付款", status: "0" },
        { title: "已付款", status: "1" },
        { title: "完成", status: "2" }
      ],
      allOrder: [],
      status: "all" // 记录tab选中状态
    };
  },
  components: {
    backtop
  },
  created() {
    this._fetchUserOrder()
  },
  methods: {
    // 获取订单和订单商品关联数据  谨记：async代表函数内有异步操作  先同后异
    async _fetchUserOrder() {
      const user_id = this.$store.state.userInfo.id;
      const orderData = await fetchUserOrder(user_id)

      let promiseGoodsAll = []
      // 先同后异  promise属于异步操作  获取值的时候先获取同步的
      // 循环里面不要写await  这样属于串行，耗性能  await是异步获取
      orderData.forEach((item) => {
        promiseGoodsAll.push(fetchCartGoods(item.goods_ids))
      })

      // 并发获取订单关联商品
      let allOrderGoods = await Promise.all(promiseGoodsAll)
      // 将订单中和订单商品进行关联，订单商品存储到goodsInfo属性中  如goodsInfo:[{},{}]
      orderData.map((item, index) => {
        item.goodsInfo = allOrderGoods[index]
        return item
      })

      this.allOrder = orderData
    },
    // 点击时将映射状态传给 status
    tabsClick(index) {
      let objMap = {
        0: 'all',
        1: '0',
        2: '1',
        3: '2',
      }
      this.status = objMap[index]
    },
    copy() {
      // 阻止事件冒泡（传播）
      event.stopPropagation()
      this.$toast.success('复制成功')
    }
  },
  computed: {
    // 状态status依赖于tab栏字段  所以在计算属性里将响应的订单数据赋值给allOrder
    filterOrderGoods() {
      // 为all字段则显示全部订单  否则判断每个订单里的状态 显示对应数据
      return this.status == 'all' ? this.allOrder : this.allOrder.filter((item) => item.status == this.status)
    },
  },

}
</script>

<style lang="scss" scoped>
.van-card {
  margin-top: 0;
}

.order_goods_hd {
  background-color: #fafafa;
  border-bottom: 1px solid #ececec;
  padding: 10px 15px;

  .ht_logo {
    display: flex;
    align-items: center;
    font-size: 15px;

    img {
      height: 21px;
      width: 21px;
      margin-right: 5px;
    }
  }

}
</style>