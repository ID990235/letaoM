import Vue from 'vue';
import 'vant/lib/index.css';

import {
  Tabbar, TabbarItem, NavBar, Badge, SubmitBar, Empty, Button, Card, Stepper, Field,
  Search, Sticky, Swipe, SwipeItem, Grid, GridItem, Divider, Lazyload, Dialog, Form,
  Toast, List, PullRefresh, Icon, GoodsAction, GoodsActionIcon, GoodsActionButton, Sku,
  SwipeCell, Checkbox, Image as VanImage, Cell, CellGroup, ActionSheet, Uploader, AddressList,
  AddressEdit, Tab, Tabs, Step, Steps, Popup, DropdownMenu, DropdownItem
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
Vue.use(Card);
Vue.use(Stepper);
Vue.use(SwipeCell);
Vue.use(Checkbox);
Vue.use(Form);
Vue.use(Field);
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(ActionSheet);
Vue.use(Uploader);
Vue.use(AddressList);
Vue.use(AddressEdit);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Popup);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Lazyload, {
  lazyComponent: true,
});