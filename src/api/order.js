import myaxios from './request'

// 提交订单
export function fetchCommitOrder(orderData) {
  return myaxios.post('/commitorder', orderData)
}

// 获取用户所有订单
export function fetchUserOrder(user_id) {
  return myaxios.post(`/userorder/${user_id}`)
}

// 获取用户订单请求
export function fetchOrderDetail(order_id) {
  return myaxios.post(`/getorder/${order_id}`)
}

// 模拟用户支付订单成功
export function fetchPayOrder(order_id) {
  return myaxios.post(`/payorder/${order_id}`)
}

// 物流信息
export function fetchWuliu() {
  return myaxios.get('/kuaidi100/')
}