# 海淘商城项目
## 介绍
集成Vite、vue2、vueRouter、Vuex、sass等项目开发模板

## 项目页面构思

1. 先不要急着写首页，务必先把整个项目先体验一下，看看页面和页面之间的关联、相同点、差异性！
2. 根据页面和页面之间的关联、相同点、差异性！ 构思页面如何合理设计，布局！ 靠经验！！！！

经过分析：

1. 有三个主页面（一级页面）（tabbar页面）
2. 其他页面就是二级页面，也可以称之为非tabbar页面

如何实现： 把上面三个主页面公共的tabbar定义在父组件中，此三个页面就是嵌套子路由

## 如何编写静态页面

基本思路：

1. 先分析有几个部分，在把某个部分细分为几个小部分。
2. 编写基本结构（html）
3. 去控制结构的基本布局如果对齐方式，横着排还是竖着排。
4. 最后结构成型之后再去改样式，如字体大小，颜色内外边距。
5. 对象psd设计稿是否接近还原！

## 电商的两个概念

SPU（Standard Product Unit）: 即产品。 如iphone6 SKU（Stock Keeping Unit）: 商品（产品+规格（属性）） 如iphone6 + 黑色、iphone6 + 32G

## 购物车商品

存储地方：Vuex 购物车商品的格式： [{商品id,选中状态,数量，价格},{}]

##  小结项目优化点

- js/css压缩合并 vite自动实现 npm run build
- 图片懒加载
- 防抖节流
- 并发 promise.all
- 路由懒加载 实现 代码分割
- CDN加速
- 取出console
- base64

## 学习是有套路

- 写页面套路 基本思路：！！！！！！！！！！

1. 先分析有几个部分，在把某个部分细分为几个小部分。
2. 编写基本结构（html）
3. 去控制结构的基本布局如果对齐方式，横着排还是竖着排。
4. 最后结构成型之后再去改样式，如字体大小，颜色内外边距。
5. 对象psd设计稿是否接近还原！

- 写逻辑（需要累积经验）
  - 先分析在去写！！！！！！！！
  - 数据和数据的关联性（计算属性）
  - 数据和页面的关联性；如没有商品应该显示暂无商品提示
  - 边界条件（多判断、多种情况）
- 不会知识怎么办？

1. 查询官方文档，why(作用-意义), what how api（晦涩难懂）
2. 掘金
3. github 搜索技巧 查看源代码
4. 记录！ 防止备忘，速查！！！

- 怎么提升水平
  - 广度 （学习周边的知识， moment dayjs）
  - 深度 (源码 mvvm vue2:Object.definedProperty vue3 proxy)
  - 看牛人博客， 知乎、优秀博客、 google

## 仓库地址

https://github.com/ID990235/letaoM