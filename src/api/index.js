import myaxios from './request'

export function fetchLunbo() {
  return myaxios('/api/getlunbo')
}

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