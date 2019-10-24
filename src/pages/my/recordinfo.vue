<template>
  <div class="recordinfo">
    <!-- 头部公共搜索框 -->
    <tabbar title="充值明细详情"></tabbar>
    <div class="con">
      <van-cell-group>
        <van-cell title="充值金额" :value="query.amount" />
        <van-cell title="充值类型" :value="type" />
        <van-cell title="充值方式" :value="way" />
        <van-cell title="审核状态" :value="audit" />
        <van-cell title="创建时间" :value="query.createtime" />
        <van-cell title="审核时间" v-if="query.status != 1" :value="query.updatetime" />
      </van-cell-group>
      <div class="image">
        <p>支付凭证</p>
        <van-image radius="10" width="3rem" height="3rem" fit="cover" :src="query.payment_voucher" />
      </div>
    </div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
export default {
  data() {
    return {
      id: "",
      type: "", //充值类型
      way: "", //充值方式
      audit: "", //审核
      query: "" //充值列表参数
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.id = this.$route.query.id;
    this.axios
      .post("/api/property_administer/rechargeInfo", { id: this.id })
      .then(data => {
        this.query = data;
        //支付类型
        if (this.query.recharge_way == 1) {
          this.type = "余额";
        } else {
          this.type = "货款";
        }
        //支付方式
        if (this.query.recharge_type == 1) {
          this.way = "线下支付";
        } else if (this.query.recharge_type == 2) {
          this.way = "微信";
        } else {
          this.way = "支付宝";
        }
        //审核状态
        if (this.query.status == 1) {
          this.audit = "待审核";
        } else if (this.query.status) {
          this.audit = "已审核";
        } else {
          this.audit = "审核失败";
        }
      });
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.recordinfo {
  padding-top: 44px;
  .con {
    .image {
      padding: 20px;
      p {
        margin-bottom: 15px;
        font-size: 14px;
      }
    }
  }
}
</style>
