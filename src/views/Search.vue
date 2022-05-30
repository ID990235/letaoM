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
      <div class="card" v-if="historyData.length">
        <div class="header">
          <h3>搜索历史</h3>
          <van-icon @click="clearHistory" name="delete-o" />
        </div>
        <div class="footer">
          <span @click="hotSearch(item)" v-for="(item, index) in historyData" :key="index">{{
              item
          }}</span>
        </div>
      </div>

      <van-divider />

      <div class="card">
        <div class="header">
          <h3>热门搜索</h3>
          <van-icon @click="eyeOpen = !eyeOpen" :name="eyeStyle" />
        </div>
        <div class="footer" v-if="eyeOpen">
          <span @click="hotSearch(item)" v-for="(item, index) in hotData" :key="index">{{ item
          }}</span>
        </div>
        <div class="text-center" v-else>已隐藏热门搜索</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      value: '',
      historyData: JSON.parse(localStorage.getItem('historyData') || '[]'), // 设置localStorage便于进来的时候获取值
      eyeOpen: true,
      hotData: ['iphone6', 'mac pro', '小米', 'DVD', '笔记本电脑']
    };
  },
  methods: {
    _fetchSearchData() {
      // 判断是否有搜索过的关键词  有则删除原来的  添加到数组最前面
      if (this.historyData.includes(this.value)) {
        let index = this.historyData.findIndex(item => item === this.value)
        this.historyData.splice(index, 1)
      }

      this.historyData.unshift(this.value)

      let blankIndex = this.historyData.findIndex(item => item.trim() == '')
      if (blankIndex !== -1) {
        this.historyData.splice(blankIndex, 1)
        return
      }

      localStorage.setItem('historyData', JSON.stringify(this.historyData))

      this.$router.push("/search-result/" + this.value)
    },
    onSearch() {
      this._fetchSearchData()
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
    },
    hotSearch(value) {

      if (this.historyData.includes(value)) {
        let index = this.historyData.findIndex(item => item === value)
        this.historyData.splice(index, 1)
      }

      this.historyData.unshift(value)
      localStorage.setItem('historyData', JSON.stringify(this.historyData))

      this.$router.push('/search-result/' + value)
    },
    clearBlank() {
      let index = this.historyData.findIndex(item => item.trim() === '')
      if(index !== -1) this.historyData.splice(index, 1)
    }
  },
  created() {
    this.clearBlank()
  },
  mounted() {
    this.onFocus()
  },
  computed: {
    eyeStyle() {
      return this.eyeOpen ? "eye-o" : "closed-eye"
    }
  },
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

        h3 {
          margin: 19px 0;
        }
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