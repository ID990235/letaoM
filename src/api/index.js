import myaxios from './request'

// 获取首页轮播图
export function fetchLunbo() {
  return myaxios('/api/getlunbo')
}

// 获取商品数据
export function fetchGoods(page = 1, limit = 8) {
  return myaxios(`/api/recommend?page=${page}&limit=${limit}`)
}

// 获取商品的轮播图
export function fetchGoodsImages(goodsid) {
  return myaxios(`/api/getthumbimages/${goodsid}`)
}

// 获取商品的基本信息
export function fetchGoodsInfo(goodsid) {
  return myaxios(`/api/getgoodsinfo/${goodsid}`)
}

// 获取购物车商品列表
export function fetchCartGoods(ids) {
  return myaxios(`/api/getshopcarlist/${ids}`)
}