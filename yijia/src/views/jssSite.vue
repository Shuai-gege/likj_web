<template>
  <div class="box">
    <!-- 头部 -->
    <van-nav-bar title="设置" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 设置内容 -->
    <van-cell title="修改密码" is-link label="修改密码" @click="Tishi" />
    <van-cell title="点三方账号管理" is-link @click="Tishi" />
    <van-cell title="清理缓存" is-link @click="Tishi" />
    <van-cell title="更新检查" is-link @click="Tishi" value="当前版本1.0.0" />
    <!-- 按钮 -->
    <van-button type="primary" size="large">退出账号</van-button>
    <p>我是设置</p>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Toast, Cell, CellGroup, Button } from "vant";
Vue.use(NavBar)
  .use(Cell)
  .use(CellGroup)
  .use(Button)
  .use(Toast);
export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    Tishi() {
      this.$toast("不要急调试阶段");
    }
  }
};
</script>
<style lang="stylus" scoped></style>