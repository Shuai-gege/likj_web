// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "lib-flexible";

//axios
import http from "@/common/js/axios";
Vue.prototype.axios = http;

// vuex
import {
  store
} from "./store/store.js";

//webdemo.js
import WebDemo from "@/common/js/webdemo.js";
Vue.prototype.demo = new WebDemo();

// Echarts
import echarts from "echarts";
Vue.prototype.echarts = echarts;

// 图片压缩后将base64转换为file
import {
  dataURLtoFile
} from "./common/js/common.js";
Vue.prototype.upfile = dataURLtoFile;

/*
 * 轮播
 */
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper);

// vant
import Vant from "vant";
import "vant/lib/index.css";

// 智能地址填写
import smartParse from 'vue-smart-parse';
Vue.use(smartParse)

Vue.use(Vant);
// 图片压缩
import lrz from "lrz";
Vue.config.productionTip = false;
/* eslint-disable no-new */
window.vms = new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  },
  template: "<App/>"
});
