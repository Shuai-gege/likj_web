<template>
  <div class="psd">
    <tabbar title="修改登录密码"></tabbar>
    <div class="con">
      <van-cell-group>
        <van-field v-model="tel" type="number" label="手机号" placeholder="请输入手机号" required />
        <van-field v-model="sms" type="number" center label="短信验证码" placeholder="请输入短信验证码" required>
          <van-button
            color="#fc4c4c"
            slot="button"
            size="small"
            type="primary"
            @click="sendCode"
          >发送验证码</van-button>
        </van-field>
        <van-field v-model="psd1" type="password" label="新密码" placeholder="请输入新密码" required />
        <van-field
          v-model="psd2"
          @blur="same"
          type="password"
          label="确认密码"
          placeholder="请再次确认密码"
          required
        />
      </van-cell-group>
      <van-button class="btn" type="danger" @click="submit">提交</van-button>
    </div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
export default {
  components: {
    tabbar
  },
  data() {
    return {
      tel: "",
      psd1: "",
      psd2: "",
      sms: ""
    };
  },

  methods: {
    same() {
      if (this.psd1 != this.psd2) {
        this.$toast("两次输入密码不一致");
      }
    },
    submit() {
      if (!/^1[3456789]\d{9}$/.test(this.tel)) {
        this.$toast("请输入正确的手机号");
      } else if (!this.sms) {
        this.$toast("请输入验证码");
      } else if (!this.psd1) {
        this.$toast("请输入新密码");
      } else if (this.psd1 != this.psd2) {
        this.$toast("两次输入密码不一致");
      } else {
      }
    },
    sendCode() {
      this.$toast("验证码");
    }
  }
};
</script>
<style lang="less">
.con {
  margin-top: 44px;
  .btn {
    margin: 150px auto;
    display: block;
    width: 90%;
  }
}
</style>