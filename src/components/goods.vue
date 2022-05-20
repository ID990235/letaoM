<template>

  <div class="goodsWrap" @click="clickHandle">
    <div class="goods_img">
      <slot name="img">
        <img v-lazy="data.img_url">
      </slot>
    </div>
    <div class="goods_info">
      <slot name="content">
        <div class="content ellipsis_line_2">{{ data.title }}</div>
      </slot>
      <slot name="footer">
        <div class="goods_footer">
          <span class="price">&yen;<i class="price_int">{{ data.sell_price }}</i>.00</span>
          <span class="buy">{{ data.buy }}购买</span>
        </div>
      </slot>
    </div>
  </div>

</template>

<script>
export default {
  name: 'goods',
  props: ['data'],
  methods: {
    clickHandle() {
      this.$emit('goodsclick', { id: this.data.id })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>