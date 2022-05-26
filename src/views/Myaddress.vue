<template>
  <div>
    <van-address-list v-model="chosenAddressId" :list="lists" default-tag-text="默认" @add="$router.push('/addAddress')"
      @edit="onEdit" @select="selectHandle" />
    <van-empty v-if="lists.length === 0" description="请先完善收获地址" />
  </div>

</template>

<script>
import { fetchGetUserAddress } from "../api/address.js"
export default {
  data() {
    return {
      chosenAddressId: '1',
      lists: []
    };
  },
  methods: {
    onEdit(item, index) {
      this.$router.push('/editAddress/' + JSON.stringify(item))
    },
    async _fetchUserAddress() {
      let user_id = this.$store.state.userInfo.id
      let addressAll = await fetchGetUserAddress(user_id);
      if (addressAll.length === 0) return;

      if (addressAll.length === 1) {
        this.chosenAddressId = addressAll[0].id
      }

      addressAll.map((item, index) => {
        if (item.isDefault == 1) {
          let defaultAddress = addressAll[index]
          addressAll.splice(index, 1)
          addressAll.unshift(defaultAddress)
          this.chosenAddressId = item.id
        }
        item.address = item.province + item.city + item.country + item.addressDetail
        return item
      })

      this.lists = addressAll;
    },
    selectHandle(addressInfo, index) {
      // 1. 把当前选中的地址存入到本地存储
      localStorage.setItem('harvestAddress', JSON.stringify(addressInfo))
      // 2.返回是一页面
      this.$router.back();
    }
  },
  created() {
    this._fetchUserAddress();
  },
};
</script>

<style>
</style>