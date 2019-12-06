<template>
  <div class="psd">
    <tabbar :title="type==1?'绑定手机号':'修改手机号'"></tabbar>
    <div class="con">
      <van-cell-group>
        <van-field v-model="old_tel" type="number" label="旧手机号" disabled required />
        <van-field v-model="tel" type="number" label="新手机号" placeholder="请输入新的手机号" required />
        <van-field v-model="sms" type="number" center label="短信验证码" placeholder="请输入短信验证码" required>
          <van-button
            color="#fc4c4c"
            slot="button"
            size="small"
            type="primary"
            @click="sendCode"
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
      <van-button class="btn" type="danger" @click="submit">提交</van-button>
    </div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
import { Dialog } from "vant";
export default {
  components: {
    tabbar
  },
  data() {
    return {
      type: "", // 1绑定手机号 2 修改手机号
      iscan: null, // iscan 是否允许绑定 1 0
      flag1: false, //如果手机号已被占用，用户确定继续绑定
      tel: "",
      old_tel: "", //旧手机号
      sms: "",
      time: 60 * 1000,
      flag: false
    };
  },
  mounted() {
    this.type = this.$route.query.type;
    this.iscan = this.$route.query.iscan;
    this.old_tel = this.$route.query.old_tel;
  },
  methods: {
    submit() {
      if (!/^1[3456789]\d{9}$/.test(this.tel)) {
        this.$toast("请输入正确的手机号");
      } else if (!this.sms) {
        this.$toast("请输入验证码");
      } else {
        if (this.flag1) {
          this.axios
            .post("/api/user/bindOnAccount", {
              mobile: this.tel,
              captcha: this.sms,
              event: "changemobile"
            })
            .then(data => {
              this.$toast("绑定成功");
              localStorage.clear();
              setTimeout(() => {
                this.$router.push({
                  path: "/",
                  query: {
                    sign_id: localStorage.getItem("sign_id")
                  }
                });
              }, 1000);
            });
        } else {
          this.axios
            .post("/api/user/changemobile", {
              mobile: this.tel,
              captcha: this.sms
            })
            .then(data => {
              if (this.type == 1) {
                this.$toast("绑定手机号成功");
              } else {
                this.$toast("修改手机号成功");
              }
              setTimeout(() => {
                this.$router.go(-1);
              }, 1000);
            });
        }
      }
    },
    sendCode() {
      if (!/^1[3456789]\d{9}$/.test(this.tel)) {
        this.$toast("请输入正确的手机号");
      } else {
        this.flag = true;
        this.axios
          .post("/api/sms/send", {
            mobile: this.tel,
            event: this.flag1 ? "mobilelogin" : "changemobile"
          })
          .then(data => {
            this.$toast("发送成功，请耐心等待~");
          })
          .catch(data => {
            this.time = 0;
            console.log("哈哈哈哈", data, this.iscan);
            if (data == "已被占用" && this.iscan == 1) {
              Dialog.alert({
                message: "该手机号已被占用，继续绑定此手机号?"
              }).then(() => {
                // on close
                this.flag1 = true;
                this.time = 0;
              });
            }
          });
      }
    },
    finished() {
      this.flag = false;
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