<template>
  <div class="box">
    <!-- 头部 -->
    <navbar title="设置"></navbar>
    <!-- 设置内容 -->
    <van-cell title="修改登录密码" is-link @click="$router.push('/modify_psd')" class="xiu" />

    <van-cell title="管理支付密码" is-link @click="$router.push('/payPsd')" />
    <van-cell title="更新检查" is-link @click="Tishi" value="当前版本1.0.0" />
    <!-- 按钮 -->
    <!-- <van-button type="primary" size="large" color="#f04c46" class="btn">退出账号</van-button> -->
  </div>
</template>
<script>
import navbar from "@/components/navbar";
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
  }
  .btn {
    margin-top: 100px;
  }
}
</style>