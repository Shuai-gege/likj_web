<template>
  <div class="box">
    <van-nav-bar title="工作台" left-text="返回" left-arrow @click-left="onClickLeft" />
    <p>我是工作台</p>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar } from "vant";
Vue.use(NavBar);
export default {
  data() {
    return {};
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="stylus" scoped></style>