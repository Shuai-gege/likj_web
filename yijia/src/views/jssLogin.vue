<template>
  <div id="box">
    <!-- 头部 -->
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- logo -->
    <div class="logo">
      <van-image round width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </div>
    <!-- 分割线 -->
    <van-divider />
    <!-- 输入框 -->
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        error-message
        @click-right-icon="$toast('手机号')"
      />

      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
    </van-cell-group>
    <van-divider />
    <!-- 按钮 -->
    <div class="Btn">
      <van-button round type="info" color="#45b97c" @click="login">登录</van-button>
      <van-button round type="info" color="#45b97c" to="/jssReg">注册</van-button>
    </div>
    <!-- 分割线 -->
    <van-divider>其他登录方式</van-divider>
    <div class="QQWX">
      <a href="#" class="QQ">
        <img src="../image/QQ.png" alt />
      </a>
      <a href="#" class="WX">
        <img src="../image/WX.png" alt />
      </a>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Field, Image } from "vant";
Vue.use(Field).use(Image);
var user = document.getElementsByClassName("van-field__body");
export default {
  data() {
    return {};
  },
  methods: {
    login() {
      this.$router.push("/jsszhongjian");
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="stylus" scope>
.logo {
  text-align: center;
  margin-top: 10px;
}

.Btn {
  text-align: center;
}

.van-cell {
  background: rgba(255, 255, 255, 0.3);
}

.van-field__button {
  opacity: 0.8;
}

.QQWX {
  text-align: center;
}

.QQWX img {
  width: 20px;
  height: 20px;
  margin: 10px;
}
</style>