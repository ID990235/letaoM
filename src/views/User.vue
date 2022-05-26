<template>
  <div class="user-container">
    <div class="userBg">
      <div class="userInfo">
        <div class="avatarImg">
          <van-image ref="myHeadImg" round width="80px" height="80px" :src="avatar" @click="show = true" />
        </div>
        <div class="username">
          用户名：{{ $store.state.userInfo.username }}
        </div>
      </div>
    </div>
    <van-uploader ref="myUpload" :max-size="60 * 1024" :after-read="afterRead" @oversize="onOversize" v-show="false"
      :max-count="1" />
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" cancel-text="取消" />

    <div class="flex_c_c">
      <div class="info">
        <van-cell-group>
          <van-cell title="我的订单" value="全部订单" @click="$router.push('/order')" is-link />
          <van-cell title="收货地址" @click="$router.push('/myaddress')" is-link />
          <van-cell title="设置" is-link />
          <van-cell title="关于乐淘" value="v1.0.3" />
          <van-button type="danger" block @click="logout">退出登录 </van-button>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { upload } from "../api/user.js"
export default {
  data() {
    return {
      show: false,
      actions: [{ name: '设置头像' }],
    }
  },
  computed: {
    avatar() {
      return 'http://api.w0824.com/' + this.$store.state.userInfo.avatar;
    }
  },
  methods: {
    ...mapMutations(['clearUserInfo']),
    logout() {
      // 调用vuex清除token
      let _this = this;
      this.$dialog.confirm({
        title: '确认退出吗'
      }).then(() => {
        _this.clearUserInfo();
        _this.$router.replace('/home/index')
      })
    },
    onSelect(item) {
      this.show = false;
      if (item.name == '设置头像') this.$refs.myUpload.$refs.input.click()
    },
    async afterRead(file) {
      let user_id = this.$store.state.userInfo.id;
      // 此时可以自行将文件上传至服务器
      if (file.file) {
        let formData = new FormData()
        formData.append('user_id', user_id)
        formData.append('file', file.file)
        let { message, status, src } = await upload(formData);
        this.$toast.success(message)
        if (status === 0) this.$store.commit('updateAvatar', src)
      }
    },
    onOversize() {
      this.$toast.fail('文件大小不能超过 60kb');
    }
  }
}
</script>
<style lang="scss" scoped>
.user-container {

  .userBg {
    padding: 10px;
    height: 180px;
    background: url(../assets/images/userBg.png) no-repeat scroll 0 0/100% auto;
  }

  .userInfo {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 220px;
    padding: 30px 16px;
    color: #eee;
    font-size: 14px;

    .username {
      color: #1A1A1A;
    }

    .avatarImg {
      position: relative;

      img {
        width: 100%;
      }
    }
  }

  .info {
    width: 90vw;
    padding: 10px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background: #fff;
    margin-top: -40px;
  }
}
</style>

