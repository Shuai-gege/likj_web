<template>
  <div class="box">
    <p>11</p>
    <van-button type="primary" @click="showPopup">展示弹出层</van-button>

    <van-popup v-model="show" position="left" :style="{ height: '100%' ,width:'20%'}" />
    <p>我是购物车</p>
  </div>
</template>
<script>
import Vue from "vue";
import { Popup } from "vant";
Vue.use(Popup);
export default {
  data() {
    return {
      show: false
    };
  },

  methods: {
    showPopup() {
      this.show = true;
    }
  }
};
</script>
<style lang="stylus" scoped></style>