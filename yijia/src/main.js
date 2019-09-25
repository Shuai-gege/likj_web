// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible';


//axios
import http from '@/common/js/axios'
Vue.prototype.axios = http


// vuex
import {
  store
} from './store/store.js'


//webdemo.js
import WebDemo from '@/common/js/webdemo.js'
Vue.prototype.demo = new WebDemo();


// 图片压缩后将base64转换为file
import {
  dataURLtoFile
} from "./common/js/common.js";
Vue.prototype.upfile = dataURLtoFile;


/*
 * 轮播
 */
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)


import {
  Grid,
  GridItem,
  Button,
  Cell,
  CellGroup,
  Icon,
  Popup,
  Checkbox,
  CheckboxGroup,
  PasswordInput,
  NumberKeyboard,
  RadioGroup,
  Radio,
  Stepper,
  Uploader,
  Dialog,
  Loading,
  SwipeCell,
  Toast,
  ImagePreview,
  List,
  Step,
  Steps,
  Swipe,
  SwipeItem,
  Area,
  Rate,
  Progress,
  NavBar,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  PullRefresh,
  Row,
  Col,
  Image
} from 'vant';
Vue.use(Row).use(Col);
Vue.use(Image);
Vue.use(PullRefresh);
Vue.use(Grid).use(GridItem);
Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Icon);
Vue.use(Popup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Stepper);
Vue.use(Uploader);
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(SwipeCell);
Vue.use(Toast);
Vue.use(ImagePreview);
Vue.use(List);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Area);
Vue.use(Rate);
Vue.use(Progress);
Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Tab).use(Tabs);
// import Vant from 'vant';
// Vue.use(Vant);

Vue.config.productionTip = false
/* eslint-disable no-new */
window.vms = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
