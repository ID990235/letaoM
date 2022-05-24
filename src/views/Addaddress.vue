<template>
  <van-address-edit :area-list="areaList" show-postal show-set-default show-search-result
    :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @change-area="getAreaCode" />
</template>

<script>
import { areaList } from '@vant/area-data';
import { fetchAddUserAddress } from "../api/address.js"
export default {
  data() {
    return {
      areaList,
      areaCode: '',
    };
  },
  methods: {
    async onSave(addressInfo) {
      let user_id = this.$store.state.userInfo.id;
      addressInfo.isDefault = addressInfo.isDefault ? 1 : 0;
      addressInfo.country = addressInfo.county;

      let data = { ...addressInfo, areaCode: this.areaCode }

      const { status, message } = await fetchAddUserAddress(user_id, data)
      this.$toast.success(message)
      this.$router.back()
    },
    getAreaCode(areaCode) {
      this.areaCode = areaCode.map(item => item.code).join('-')
    }
  },
};
</script>

<style>
</style>