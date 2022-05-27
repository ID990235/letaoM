<template>
  <div class="searchResult-container">
    <!-- 搜索栏 -->
    <van-search class="search" :autofocus="true" v-model="keyword" show-action placeholder="请输入搜索关键词"
      @search="onSearch">
      <template #left>
        <van-button type="default" size="small" color="#fff0" @click="$router.back()">
          <template #icon>
            <van-icon name="arrow-left" color="#5e606b" size="18" />
          </template>
        </van-button>
      </template>
      <template #action>
        <div @click="onSearch">
          <van-button type="primary" color="red" size="small">搜索</van-button>
        </div>
      </template>
    </van-search>

    <!-- 排序筛选 -->
    <van-dropdown-menu v-if="goodsList.length">
      <van-dropdown-item v-model="sort" :options="option1" @change="optionsChange" />
    </van-dropdown-menu>
    <van-empty v-if="goodsList.length === 0" description="暂无搜索结果" />

    <div class="goodslist">
      <Goods v-for="item in goodsList" :key="item.id" :data="item" @goodsclick="goodsclick"></Goods>
    </div>

    <backTop></backTop>

  </div>
</template>

<script>
import { fetchSearchGoods } from '../api/index'
import Goods from '../components/goods.vue'
import backTop from '../components/backTop.vue'
export default {
  data() {
    return {
      keyword: this.$route.params.keyword,
      sort: 'buy',
      order: 'desc',
      option1: [
        { text: '销量', value: 'buy' },
        { text: '好评', value: 'likes' },
        { text: '价格', value: 'sell_price' },
      ],
      page: 1,
      pagesize: 6,
      goodsList: []
    }
  },
  components: {
    Goods, backTop
  },
  methods: {
    async _fetchSearchGoods() {
      let data = {
        value: this.keyword,
        sort: this.sort,
        order: this.order,
        page: this.page,
        pagesize: this.pagesize
      }
      const result = await fetchSearchGoods(data)
      this.goodsList = result
    },
    onSearch() {
      const historyData = JSON.parse(localStorage.getItem('historyData'))
      if (!historyData.includes(this.keyword)) {
        historyData.unshift(this.keyword)
        localStorage.setItem('historyData', JSON.stringify(historyData))
      }
      
      if (!this.keyword.trim() == '') {
        this.$router.replace("/search-result/" + this.keyword)
      }

      this._fetchSearchGoods()
    },
    optionsChange(value) {
      this.sort = value
      this._fetchSearchGoods()
    },
    goodsclick(data) {
      const id = data.id
      this.$router.push(`/goodsdetail/${id}`)
    }
  },
  created() {
    this._fetchSearchGoods()
  }
}
</script>

<style lang="scss" scoped>
.searchResult-container {

  // 搜索栏
  .search {
    padding: 8px 0px;

    .van-search__action {
      line-height: 0px;
    }
  }
}
</style>