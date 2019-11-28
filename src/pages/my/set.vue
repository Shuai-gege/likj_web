<template>
  <div class="box">
    <!-- 头部 -->
    <navbar title="设置"></navbar>
    <!-- 设置内容 -->
    <div class="xiu">
      <!-- <van-cell title="修改登录密码" is-link @click="$router.push('/modify_psd')" class="xiu" /> -->
      <van-cell icon="location" title="管理收货地址" is-link @click="$router.push('/address')" />
      <van-cell icon="browsing-history" title="设置支付密码" is-link @click="paypsd(initdata.mobile)" />
      <van-cell icon="smile" title="修改登录密码" is-link @click="loginpsd(initdata.mobile)" />
      <van-cell
        :value="initdata.mobile?'':'未绑定'"
        is-link
        icon="phone-circle"
        @click="setTel(initdata.mobile,initdata.bind_account)"
      >
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span class="custom-title">{{initdata.mobile?'修改手机号':'绑定手机号'}}</span>
          <van-icon v-if="!initdata.mobile" name="warning-o" />
        </template>
      </van-cell>
    </div>
  </div>
</template>
<script>
import navbar from "@/components/navbar";
export default {
  data() {
    return {
      initdata: {} //请求数据
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    Tishi() {
      this.$toast("不要急调试阶段");
    },
    // 修改登录密码
    loginpsd(mobile) {
      this.$router.push({
        path: "/login_psd",
        query: {
          mobile
        }
      });
    },
    // 设置支付密码
    paypsd(mobile) {
      this.$router.push({
        path: "/payPsd",
        query: {
          mobile
        }
      });
    },
    // 修改手机号
    setTel(tel, iscan) {
      this.$router.push({
        path: "/set_tel",
        query: {
          type: tel ? 2 : 1,
          iscan: iscan ? 1 : 0,
          old_tel: tel
        }
      });
    }
  },
  mounted() {
    this.axios.post("/api/user/index").then(data => {
      this.initdata = data;
      localStorage.setItem("agent_id", data.up_agent_id);
    });
  },
  components: {
    navbar
  }
};
</script>
<style lang="less" scoped>
.box {
  .xiu {
    margin-top: 46px;
    .van-icon-location:before {
      font-size: 25px;
      color: #da2d2d;
      margin-right: 10px;
    }
    .van-icon-browsing-history:before {
      font-size: 25px;
      color: #ff8ba7;
      margin-right: 10px;
    }
    .van-icon-smile:before {
      font-size: 25px;
      color: #ffad87;
      margin-right: 10px;
    }
    .van-icon-phone-circle:before {
      font-size: 25px;
      color: #f45905;
      margin-right: 10px;
    }
    .van-icon-warning-o:before {
      display: inline-block;
      color: #fc0a0a;
      font-size: 13px;
      font-weight: 700;
    }
  }
  .btn {
    margin-top: 100px;
  }
}
</style>