<template>
  <div class="box">
    <div class="Login">
      <!-- 头部 -->
      <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
      <!-- 头像 -->
      <div class="Tou">
        <van-image round width="100" height="100px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </div>
      <!-- 按钮 -->
      <div class="login">
        <van-button type="primary" to="/jssLogin">登录</van-button>
      </div>
    </div>
    <van-divider />
    <van-swipe-cell>
      <van-cell :border="false" title="单元格" value="内容" />
      <van-cell :border="false" title="单元格" value="内容" />
      <van-cell :border="false" title="单元格" value="内容" />
      <van-cell :border="false" title="单元格" value="内容" />
      <van-cell :border="false" title="单元格" value="内容" />
    </van-swipe-cell>
    <p>我是我的页面</p>
  </div>
</template>
<script>
import Vue from "vue";
import { SwipeCell, Cell } from "vant";

Vue.use(SwipeCell).use(Cell);
export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      Toast("按钮");
    }
  }
};
</script>
<style lang="stylus" scoped>
.Tou {
  text-align: center;
}

.login {
  text-align: center;
}

.Login {
  background-image: url('../image/login.gif');
}

.van-button--primary {
  background: rgba(0, 0, 0, 0);
  border: 1px solid rgba(0, 0, 0, 0);
  color: white;
}
</style>