<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="goodslist">
          <Goods v-for="item in lists" :key="item.id" :data="item" @goodsclick="goodsRouter">
            <template #footer>
              <div class="footer">
                <div class="price_wrap">
                  <span class="price">&yen;<i class="price_int">{{ item.sell_price }}</i>.00</span>
                  <span class="buy">&yen;{{ item.market_price }}</span>
                </div>
                <div class="info_wrap">
                  <span class="hot">热卖中</span>
                  <span class="remain">剩余{{ item.stock_quantity }}件</span>
                </div>
              </div>
            </template>
          </Goods>
        </div>
      </van-list>
    </van-pull-refresh>

    <!-- backTop -->
    <backtop :scrollTop="500"></backtop>
  </div>
</template>

<script>
import { fetchGoodsList } from '../api/goodslist.js'
import Goods from '../components/goods.vue'
// 导入backTop组件
import backtop from '../components/backTop.vue'
export default {
  data() {
    return {
      lists: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 0,
      limit: 6,
    };
  },
  components: {
    Goods, backtop
  },
  methods: {
    async onLoad() {
      this.page++;

      if (this.refreshing) {
        this.lists = [];
        this.refreshing = false;
      }

      const { message } = await fetchGoodsList(this.page, this.limit);
      this.lists = [...this.lists, ...message];
      // 加载完毕
      this.loading = false;

      // 数据加载完毕  往上拉不会再发送请求
      message.length === 0
        ? (this.lists.length % 2 === 1 && this.lists.pop(), this.finished = true)
        : this.finished = false;
    },
    onRefresh() {
      this.page = 0;
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    goodsRouter({ id }) {
      this.$router.push(`/goodsDetail/${id}`)
    }
  },
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .price_wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 125px;
  }

  .info_wrap {
    display: flex;
    margin-top: 8px;
    justify-content: space-between;
    color: #787272;
    font-size: 14px;
  }
}
</style>