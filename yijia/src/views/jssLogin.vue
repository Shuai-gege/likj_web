<template>
  <div id="box">
    <!-- 头部 -->
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- logo -->
    <div class="logo center">
      <van-image round width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </div>
    <!-- 分割线 -->
    <!-- <van-divider /> -->
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
    <!-- <van-divider /> -->
    <!-- 按钮 -->
    <div class="Btn">
      <van-button round type="info" color="#45b97c" @click="login">登录</van-button>
      <van-button round type="info" color="#45b97c" to="/jssReg">注册</van-button>
    </div>
    <!-- 分割线 -->
    <van-divider>其他登录方式</van-divider>
    <div class="QQWX center">
      <a href="http://lj.tieqiao.shop/api/user/wxlogin" class="WX">
        <img src="../image/WX.png" alt />
      </a>
    </div>
    <div class="agreement">
      <p>
        登录注册即便是您同意乐匠
        <a href="../views/jssTishi.vue">用户协议</a>和
        <a href="../views/jssTishi.vue">隐私政策</a>
      </p>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Field, Image } from "vant";
import axios from "axios";
import Axios from "axios";
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

<style lang="less" scope>
.logo {
  margin: 30px 0;
}

.Btn {
  text-align: center;
  margin: 30px 0;
  button {
    width: 70px;
    height: 30px;
    line-height: 30px;
    margin: 0 10px;
  }
}

.van-cell {
  background: rgba(255, 255, 255, 0.3);
}

.van-field__button {
  opacity: 0.8;
}

.QQWX {
  margin: 10px 0;
}

.QQWX img {
  width: 20px;
  height: 20px;
  margin: 10px;
}

.agreement {
  font-size: 12px;
  text-align: center;
  color: #b2b3b8;
}
</style>