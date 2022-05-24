<template>
  <van-address-edit :area-list="areaList" show-postal show-delete show-set-default show-search-result
    :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" :address-info="addressInfo" @delete="deleteAddress"
    @change-default="changeDefault" @change-area="changeArea" />
</template>

<script>
import { areaList } from '@vant/area-data';
import { fetchUpdateAddress, fetchDeleteAddress } from "../api/address.js"
export default {
  data() {
    return {
      areaList,
      areaCode: '',
      isDefault: '',
      fromAddressInfo: JSON.parse(this.$route.params.addressInfo)
    };
  },
  created() {
    // 设置默认值 防止地区或默认地址未修改空值
    this.areaCode = this.fromAddressInfo.areaCode;
    this.isDefault = this.fromAddressInfo.isDefault
  },
  methods: {
    // 编辑地址保存
    async onSave(addressInfo) {
      let isDefault = this.isDefault ? 1 : 0;
      let areaCode = this.areaCode;
      let country = addressInfo.county

      const data = { ...addressInfo, isDefault, areaCode, country }

      const { status, message } = await fetchUpdateAddress(addressInfo.id, data)
      status === 0 ? (this.$toast.success(message), this.$router.back()) : this.$toast.fail(message)
    },
    // 删除地址
    async deleteAddress(current) {
      const { id } = current
      const { status, message } = await fetchDeleteAddress(id)
      status === 0 ? (this.$toast.success(message), this.$router.back()) : this.$toast.fail(message)
    },
    changeDefault(bool) {
      this.isDefault = bool;
    },
    changeArea(data) {
      this.areaCode = data.map(item => item.code).join('-');
    },
  },
  computed: {
    addressInfo() {
      let address = JSON.parse(this.$route.params.addressInfo)
      address.isDefault = address.isDefault ? true : false;
      address.areaCode = address.areaCode.split('-')[2];
      return address
    }
  }
}
</script>

<style>
</style>