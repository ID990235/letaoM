import myaxios from './request'

export function fetchGoodsList(page = 1, limit = 10) {
  return myaxios(`/getgoods?pageindex=${page}&pagesize=${limit}`)
}