<template>
  <div class="shoukuan">
    <!-- 头部公共搜索框 -->
    <tabbar title="公司收款账户"></tabbar>
    <div class="con">
      <van-tabs v-model="active">
        <van-tab title="微信">
          <p v-if="info.wx_account_status != 1" class="unopen">微信账户暂未开放</p>
          <div class="item" v-else>
            <van-cell title="收款账户类型" value="微信" size="large" />
            <van-cell title="收款人" :value="info.wx_name" size="large" />
            <van-cell title="微信号" :value="info.wx_account" size="large" />
            <van-image
              style="margin:30px auto;display:block;"
              width="200"
              height="200"
              :src="info.wx_qrcode"
            />
          </div>
        </van-tab>
        <van-tab title="支付宝">
          <p v-if="info.zfb_account_status != 1" class="unopen">支付宝账户暂未开放</p>
          <div class="item" v-else>
            <van-cell title="收款账户类型" value="支付宝" size="large" />
            <van-cell title="收款人" :value="info.zfb_name" size="large" />
            <van-cell title="账号" :value="info.zfb_account" size="large" />
            <van-image
              style="margin:30px auto;display:block;"
              width="200"
              height="200"
              :src="info.zfb_qrcode"
            />
          </div>
        </van-tab>
        <van-tab title="银行卡">
          <p v-if="info.bank_account_status != 1" class="unopen">银行卡账户暂未开放</p>
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
      info: {} //收款信息
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.type = this.$route.query.type;
    this.axios.post("/api/property_administer/companyAccount").then(data => {
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
  .unopen {
    padding: 100px 0 0 139px;
  }
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
