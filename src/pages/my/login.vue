<template>
  <div id="box">
    <!-- 头部 -->
    <head1 title="登录"></head1>

    <div class="bgt" style="margin-top:44px;">
      <img src="../../image/loginbgt.png" alt />
    </div>
    <van-tabs v-model="active">
      <van-tab title="登录">
        <!-- 分割线 -->
        <!-- <van-divider /> -->
        <!-- 输入框 -->
        <van-cell-group>
          <van-field
            v-model="username"
            required
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
        </div>

        <div class="agreement">
          <p>
            登录注册即便是您同意乐匠
            <router-link to="/yonghu">用户协议</router-link>和
            <router-link to="/yinsi">隐私政策</router-link>
          </p>
        </div>
      </van-tab>
      <van-tab title="注册">
        <!-- 输入框 -->
        <van-cell-group>
          <van-field
            v-model="username"
            required
            label="用户名"
            right-icon="question-o"
            placeholder="请输入用户名/手机号"
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
        <van-button
          type="primary"
          size="large"
          color="linear-gradient(to right, #4bb0ff, #6149f6)"
          style="margin:100px auto 0; width:90%; display:block;"
        >注册</van-button>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import head1 from "../../components/navbar";
export default {
  data() {
    return {
      username: "",
      password: "",
      sms: "",
      active: ""
    };
  },
  components: {
    head1
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
.bgt {
  width: 100%;
  height: 150px;
  background: #f00;
  img {
    width: 100%;
    height: 100%;
  }
}

.Btn {
  text-align: center;
  margin: 30px 0;
  button {
    width: 300px;
    height: 40px;
    line-height: 30px;
    margin: 80px 10px;
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