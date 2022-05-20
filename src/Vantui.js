import Vue from 'vue';
import 'vant/lib/index.css';

import {
  Tabbar, TabbarItem, NavBar, Badge, SubmitBar, Empty, Button, Card, Stepper,
  Search, Sticky, Swipe, SwipeItem, Grid, GridItem, Divider, Lazyload, Dialog, Cell,
  Toast, List, PullRefresh, Icon, GoodsAction, GoodsActionIcon, GoodsActionButton, Sku,
  SwipeCell, Checkbox
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
Vue.use(Icon)
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Sku);
Vue.use(Dialog);
// Vue.use(Cell);
Vue.use(Card);
Vue.use(Stepper);
Vue.use(SwipeCell);
Vue.use(Checkbox);
Vue.use(Lazyload, {
  lazyComponent: true,
});