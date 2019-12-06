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
            label="手机号"
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
          <van-button
            round
            type="info"
            color="linear-gradient(to right, pink, #f00)"
            @click="log"
          >登录</van-button>
          <span class="forget flex_c" @click="$router.push('/modify_psd')">忘记密码？</span>
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
            v-model="signusername"
            required
            label="用户名"
            right-icon="question-o"
            placeholder="请输入用户名"
            @click-right-icon="$toast('请输入用户名')"
            v-if="init.user_bool == 1"
          />
          <!-- 注册手机号 -->
          <van-field
            v-model="signtel"
            required
            label="手机号"
            right-icon="question-o"
            placeholder="请输入手机号"
            @click-right-icon="$toast('请输入正确的手机号')"
          />
          <!-- 注册密码 -->
          <van-field
            v-model="signpassword"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
          />
          <!-- 注册邀请人 -->
          <van-field v-model="inviter" label="邀请人电话" placeholder="请输入邀请人" required />
        </van-cell-group>&nbsp;
        <!-- 验证码 -->
        <van-cell-group v-if="init.captcha_bool == 1">
          <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
            <van-button
              slot="button"
              size="small"
              type="primary"
              color="linear-gradient(to right, pink, #f00)"
              round
              @click="send"
              :disabled="flag"
            >
              <span v-if="!flag">发送验证码</span>
              <div class="flex_l" v-else>
                <van-count-down format="ss" :time="time" style="color:#fff;" @finish="finished" />
                <i style="font-size: 15px; margin-left: 8px;margin-bottom: 2px;">S</i>
              </div>
            </van-button>
          </van-field>
        </van-cell-group>
        <!-- btn -->
        <van-button
          round
          type="info"
          color="linear-gradient(to right, pink, #f00)"
          style="margin:100px auto 0; width:90%; display:block;"
          @click="signup"
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
      username: "", //登录手机号
      password: "", //登录密码
      signusername: "", //用户名
      signtel: "", //注册手机号
      signpassword: "", //注册密码
      inviter: "", //注册邀请人
      sms: "", //验证码
      active: "1",
      init: {}, //注册限制
      flag: false,
      time: 60 * 1000
    };
  },
  components: {
    head1
  },
  mounted() {
    this.axios.post("/api/user/user_set").then(data => {
      this.init = data;
    });
    if (this.$route.query.mobile) {
      this.signtel = this.$route.query.mobile;
    } else {
      this.signtel;
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 发送验证码
    send() {
      if (!/^1[3456789]\d{9}$/.test(this.signtel)) {
        this.$toast("请输入正确的手机号");
      } else if (!this.signpassword) {
        this.$toast("请输入密码");
      } else if (!this.signusername) {
        this.$toast("请输入用户名");
      } else {
        this.flag = true;
        this.axios
          .post("/api/sms/send", {
            mobile: this.signtel,
            event: "register"
          })
          .then(data => {
            this.$toast("发送成功");
          })
          .catch(err => {
            this.time = 0;
          });
      }
    },
    finished() {
      this.flag = false;
    },
    // 验证验证码
    // yanzheng() {
    //   if (!this.signusername) {
    //     this.$toast("请输入用户名");
    //   } else if (!/^1[3456789]\d{9}$/.test(this.signtel)) {
    //     this.$toast("请输入正确的手机号");
    //   } else if (!this.signpassword) {
    //     this.$toast("请输入密码");
    //   } else {
    //     this.axios
    //       .post("/api/sms/check", {
    //         mobile: this.signtel,
    //         event: "register",
    //         captcha: this.sms
    //       })
    //       .then(data => {});
    //   }
    // },
    // 注册
    signup() {
      if (!this.signusername) {
        this.$toast("请输入用户名");
      } else if (!/^1[3456789]\d{9}$/.test(this.signtel)) {
        this.$toast("请输入正确的手机号");
      } else if (!this.signpassword) {
        this.$toast("请输入密码");
      } else {
        this.axios
          .post("/api/user/register", {
            username: this.signusername, //会员名称
            password: this.signpassword, //会员密码
            mobile: this.signtel, //会员手机号
            recommend: this.inviter, //邀请人
            event: "register", //发送短信事件
            captcha: this.sms //验证码
          })
          .then(data => {
            this.$toast("注册成功");
            setTimeout(() => {
              this.active = "0";
            }, 1000);
          });
      }
    },
    // 登录
    log() {
      if (!this.username) {
        this.$toast("请输入手机号");
      } else if (!this.password) {
        this.$toast("请输入密码");
      } else {
        this.axios
          .post("/api/user/login", {
            account: this.username,
            password: this.password
          })
          .then(data => {
            this.$toast("登录成功");
            localStorage.setItem("token_tel", data.userinfo.token);
            setTimeout(() => {
              this.$router.push("/");
            }, 1000);
          });
      }
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
  .forget {
    color: #fc4c4c;
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