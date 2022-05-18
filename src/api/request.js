import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://api.w0824.com'
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  console.log('请求拦截器');
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  console.log('请求拦截器');
  return response.data // 直接返回响应的data数据
}, function (error) {
  return Promise.reject(error);
});

export default instance
