import axios from 'axios'
import { Toast } from 'vant'
const instance = axios.create({
  baseURL: 'http://api.w0824.com'
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // console.log('请求拦截器');
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
  // console.log('请求拦截器');
  Toast.clear();
  return response.data // 直接返回响应的data数据
}, function (error) {
  Toast.clear();
  return Promise.reject(error);
});

export default instance
