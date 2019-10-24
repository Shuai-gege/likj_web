<template>
  <div class="shoukuan">
    <!-- 头部公共搜索框 -->
    <tabbar :title="id?'上级收款账户':'我的收款账户'"></tabbar>
    <div class="con">
      <van-tabs v-model="active">
        <van-tab title="微信">
          <p v-if="info.wx_account_status != 1">微信账户暂未开放</p>
          <div class="item" v-else>
            <van-cell title="收款账户类型" value="微信" size="large" />
            <van-cell title="收款人" :value="info.wx_account_name" size="large" />
            <van-cell title="微信号" value="12345675452" size="large" />
            <van-image
              style="margin:30px auto;display:block;"
              width="200"
              height="200"
              :src="info.wx_qrcode"
            />
          </div>
        </van-tab>
        <van-tab title="支付宝">
          <p v-if="info.zfb_account_status != 1">支付宝账户暂未开放</p>
          <div class="item" v-else>
            <van-cell title="收款账户类型" value="支付宝" size="large" />
            <van-cell title="收款人" :value="info.zfb_account_name" size="large" />
            <van-cell title="账号" value="12345565452" size="large" />
            <van-image
              style="margin:30px auto;display:block;"
              width="200"
              height="200"
              :src="info.zfb_qrcode"
            />
          </div>
        </van-tab>
        <van-tab title="银行卡">
          <p v-if="info.bank_account_status != 1">银行卡账户暂未开放</p>
          <div class="item" v-else>
            <van-cell title="收款账户类型" value="银行卡" size="large" />
            <van-cell title="持卡人" :value="info.bank_holder" size="large" />
            <van-cell title="卡号" :value="info.bank_account" size="large" />
            <van-cell title="银行" :value="info.bank_name" size="large" />
            <!-- <van-image
              style="margin:30px auto;display:block;"
              width="200"
              height="200"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />-->
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
export default {
  data() {
    return {
      active: 0, //默认
      info: {}, //收款信息
      type: "", //1提交信息，2展示信息
      id: "" //接受上级代理id
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.type = this.$route.query.type1;
    this.id = this.$route.query.id;
    this.axios
      .post("/api/property_administer/personalAccount", {
        type: this.type,
        id: this.id
      })
      .then(data => {
        this.info = data;
      });
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.shoukuan {
  padding-top: 44px;
  background-color: #f5f5f5;
  min-height: 100vh;
  .con {
    margin-top: -1px;
    .item {
      background-color: #fff;
      margin: 10px 12px;
      padding: 10px;
      border-radius: 5px;
    }
  }
}
</style>
