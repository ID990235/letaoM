import axios from 'axios'
import { Toast } from 'vant'
import store from '../store/index'
import router from '../router'

const instance = axios.create({
  baseURL: 'http://api.w0824.com/api'
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 告诉服务器，不需要缓存
  // If-Modified-Since 是标准的HTTP请求头标签，在发送HTTP请求时，
  // 把浏览器端缓存页面的最后修改时间一起发到服务器去，服务器会把这个时间与服务器上实际文件的最后修改时间进行比较
  config.headers['If-Modified-Since'] = 0;
  // 设置token请求头给服务器
  if (store.state.token) {
    // 校验的token时效过了或者删除则返回状态为40001
    config.headers['token'] = store.state.token;
  }

  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  let { status, message } = response.data;
  // 服务端校验状态为40001则返回登录页
  if (status === 40001) {
    Toast(message);
    store.commit('clearUserInfo')
    router.push('/login');
    return
  }
  Toast.clear();
  return response.data // 直接返回响应的data数据
}, function (error) {
  Toast.clear();
  return Promise.reject(error);
});

export default instance
