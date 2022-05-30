<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <router-link tag="div" to="/register" class="text-center text-gray-color go_register">没有账号？去注册</router-link>
  </div>
</template>

<script>
import { fetchLogin } from '../api/user'
// 导入vuex辅助函数
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setToken']),
    async onSubmit({ username, password }) {
      const { status, token, userInfo, message } = await fetchLogin(username, password)
      this.$toast(message)
      if (status === 0) {
        // 设置用户信息和token到vuex保存
        this.setUserInfo(userInfo);
        this.setToken(token);
        let { redirect } = this.$route.query
        // 判断是否有重定向字符串
        redirect ? this.$router.push(redirect) : this.$router.push('/home/index');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.go_register {
  width: 130px;
  margin: 0 auto;
}
</style>