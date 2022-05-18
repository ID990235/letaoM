<template>

  <div class="goodsWrap">
    <div class="goods_img">
      <slot name="img">
        <img src="http://test.w0824.com/jinshidun.png">
      </slot>
    </div>
    <div class="goods_info">

      <div class="content ellipsis_line_2">
        <slot name="content">
          我是嫩爹
        </slot>
      </div>

      <div class="goods_footer">
        <span class="price">&yen;
          <i class="price_int">
            <slot name="price">2300</slot>
          </i>.00
        </span>
        <span class="buy">
          <slot name="buy">100</slot>购买
        </span>
      </div>
    </div>
  </div>

</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.goodsWrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 48%;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;

  .goods_img {
    width: 100%;
    height: 189.3px;
    margin-bottom: 8px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 20%;
      transform: scale(0.9);
    }
  }

  .goods_info {
    padding: 0 10px 10px;

    .content {
      font-size: 18px;
      text-align: left;
      height: 45px;
      line-height: 23px;
    }

    .goods_footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      height: 40px;

      .price {
        font-family: JDZH-Regular, sans-serif;
        font-size: 15px;
        line-height: 1.5rem;
        color: #ff4142;
      }

      .price_int {
        font-size: 20px;
      }

      .buy {
        font-size: 13px;
      }
    }
  }
}
</style>