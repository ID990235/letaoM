import Vue from "vue";
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartData: []
  },
  mutations: {
    // 添加商品到购物车
    addGoodsToCar(state, data) {
      let index = state.cartData.findIndex((item) => item.id === data.id)
      index === -1 ? state.cartData.push(data) : state.cartData[index].number += data.number
    },
    // 修改商品数量
    revisalNum(state, data) {
      let { num, index } = data
      state.cartData[index].number = num
    },
    // 删除商品
    removeGoods(state, index) {
      state.cartData.splice(index, 1)
    },
    // 设置商品状态
    setItemCheck(state, data) {
      const { index, check } = data;
      state.cartData[index].isCheck = !state.cartData[index].isCheck
    },
    // 设置全选状态
    allCheck(state, data) {
      state.cartData.forEach(item => item.isCheck = data)
    }
  },
  getters: {
    // 获取购物车数量
    getCartNum(state) {
      return state.cartData.length
    },
    // 映射选中状态
    getIsCheck(state) {
      let mapObj = {}
      state.cartData.forEach((item, index) => mapObj[index] = item.isCheck)
      return mapObj
    },
    // 全选按钮获取所有商品是否选中
    getAllCheck(state) {
      let ischeck = false
      state.cartData.length == 0 ? ischeck = false : ischeck = state.cartData.every((item) => item.isCheck == true)
      return ischeck
    },
    // 获取总价格
    getTotalPrice(state) {
      let totalPrice = 0
      state.cartData.map((item, value) => {
        if (state.cartData[value].isCheck == true) return totalPrice += item.price * item.number
      })
      return totalPrice
    },
    // 获取总数量
    getTotalNum(state) {
      let totalNum = 0
      state.cartData.map((item, value) => {
        if (state.cartData[value].isCheck == true) return totalNum += item.number
      })
      return totalNum
    }
  },
  // plugins: [createPersistedState()]
})

export default store