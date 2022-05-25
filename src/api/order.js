import myaxios from './request'

// 提交订单
export function fetchCommitOrder(orderData) {
  return myaxios.post('/commitorder', orderData)
}

// 获取用户订单列表
export function fetchUserOrder(user_id) {
  return myaxios.post(`/userorder/${user_id}`)
}
