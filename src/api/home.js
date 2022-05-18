import myaxios from './request'

export function fetchLunbo() {
  return myaxios('/api/getlunbo')
}

export function fetchGoods(page = 1, limit = 8) {
  return myaxios(`/api/recommend?page=${page}&limit=${limit}`)
}