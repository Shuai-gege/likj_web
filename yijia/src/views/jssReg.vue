<template>
  <div class="box">
    <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 输入框 -->
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('请输入正确的手机号')"
      />

      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
    </van-cell-group>
    <!-- 分割线 -->
    <van-divider />
    <!-- 验证码 -->
    <van-cell-group>
      <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- btn -->
    <van-button type="primary" size="large" color="linear-gradient(to right, #4bb0ff, #6149f6)">注册</van-button>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Field, Button, Divider } from "vant";
Vue.use(NavBar)
  .use(Field)
  .use(Button)
  .use(Divider);
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

<style lang="stylus" scoped>
.van-button--large {
  margin-top: 150px;
}
</style>