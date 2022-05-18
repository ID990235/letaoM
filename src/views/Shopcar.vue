<template>
  <div>
    <h1>购物车</h1>
    <van-empty description="你的购物车空空如也" :image="carImg">
      <van-button round type="danger" class="bottom-button" to="/home/index">去首页</van-button>
    </van-empty>

    <van-submit-bar class="mb50" :price="0" button-text="提交订单" tip="仅支持微信支付">
      <template>共选中 0 件</template>
    </van-submit-bar>
  </div>
</template>

<script>
import carImg from '../assets/images/car.png'
export default {
  name: 'Shopcar',
  data() {
    return {
      carImg,
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
</style>

