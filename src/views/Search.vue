<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <van-search class="search" :autofocus="true" v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch"
      @cancel="onCancel">
      <template #left>
        <van-button type="default" size="small" color="#fff0" to="/home/index">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    };
  },
  methods: {
    onSearch(val) {
      this.onCancel()
    },
    onCancel() {
      this.$toast('搜索');
    },
    onFocus() {
      document.getElementsByClassName('van-field__control')[0].focus();
    }
  },
  mounted() {
    this.onFocus()
  }
};
</script>

<style lang="scss" scoped>
.search-container {
  .search {
    padding: 8px 0px;

    .van-search__action {
      line-height: 0px;
    }
  }
}
</style>