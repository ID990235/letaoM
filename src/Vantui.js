import Vue from 'vue';
import 'vant/lib/index.css';

import {
  Tabbar, TabbarItem, NavBar, Badge, SubmitBar, Empty, Button,
  Search, Sticky, Swipe, SwipeItem, Grid, GridItem, Divider, Lazyload,
  Toast, List, PullRefresh,
} from 'vant';
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(Badge)
Vue.use(SubmitBar)
Vue.use(Empty)
Vue.use(Button)
Vue.use(Search)
Vue.use(Sticky)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Divider)
Vue.use(Toast)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Lazyload, {
  lazyComponent: true,
});