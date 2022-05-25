<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <van-search class="search" :autofocus="true" v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch">
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

    <div class="searchWrap">
      <div class="card">
        <div class="header">
          <h3>搜索历史</h3>
          <!-- <i @click="clearHistory" class="iconfont icon-trash"></i> -->
          <van-icon @click="clearHistory" name="delete-o" />
        </div>
        <div class="footer">
          <span @click="searchData(item)" v-for="(item, index) in historyData" :key="index">{{ item }}</span>
        </div>

      </div>
      <van-divider />

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      historyData: JSON.parse(localStorage.getItem('historyData') || '[]'),
    };
  },
  methods: {
    _fetchSearchData(value) {
      if (!this.value) {
        this.$toast('请输入关键字')
        return
      }

      // 判断是否有搜索过的关键词  无则添加进value数组然后赋值给本地存储
      if (!this.historyData.includes(this.value)) {
        this.historyData.unshift(this.value)
        localStorage.setItem('historyData', JSON.stringify(this.historyData))
      }

      this.$router.push("/search-result/" + this.value)
    },
    onSearch() {
      this._fetchSearchData(this.value)
    },
    clearHistory() {
      this.$dialog.confirm({
        message: '确定要清空吗？',
      }).then(() => {
        this.historyData = [];
        localStorage.removeItem('historyData')
      })
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

  // 搜索栏
  .search {
    padding: 8px 0px;

    .van-search__action {
      line-height: 0px;
    }
  }

  // 搜索记录
  .searchWrap {
    background-color: #ffffff;
    border-top: 1px solid rgb(238, 237, 237);

    .card {
      padding: 6px;

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 4px;
      }

      .footer {
        display: flex;
        flex-wrap: wrap;

        span {
          height: 25px;
          line-height: 25px;
          background: #f3f5f6;
          font-size: 14px;
          margin-right: 6px;
          padding: 2px 6px;
          text-align: center;
          border-radius: 6px;
          margin: 4px;
        }
      }
    }
  }
}
</style>