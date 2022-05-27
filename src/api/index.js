import myaxios from './request'

// 获取首页轮播图
export function fetchLunbo() {
  return myaxios('/getlunbo')
}

// 获取商品数据
export function fetchGoods(page = 1, limit = 8) {
  return myaxios(`/recommend?page=${page}&limit=${limit}`)
}

// 获取商品的轮播图
export function fetchGoodsImages(goodsid) {
  return myaxios(`/getthumbimages/${goodsid}`)
}

// 获取商品的基本信息
export function fetchGoodsInfo(goodsid) {
  return myaxios(`/getgoodsinfo/${goodsid}`)
}

// 获取购物车商品列表
export function fetchCartGoods(ids) {
  return myaxios(`/getshopcarlist/${ids}`)
}

// 商品搜索接口
// search?value=i&sort=buy&page=1&pagesize=10
export function fetchSearchGoods(options) {
  // let { value, sort, order, page, pagesize } = options;
  let queryString = Object.keys(options).map(key => `${key}=${encodeURIComponent(options[key])}`).join('&')
  return myaxios.get(`/search?${queryString}`)
}