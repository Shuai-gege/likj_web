<template>
  <div class="recordinfo">
    <!-- 头部公共搜索框 -->
    <tabbar title="提现明细详情"></tabbar>
    <div class="con">
      <van-cell-group>
        <van-cell title="提现类型" :value="type" />
        <van-cell title="提现到方式" :value="way" />
        <van-cell title="提现金额" :value="query.money" />
        <van-cell title="实付金额" :value="query.actual_payment" />
        <van-cell title="手续费" :value="query.commission" />
        <van-cell title="提现状态" :value="audit" />
        <van-cell title="收款账号" :value="query.account_number" />
        <van-cell title="收款人" :value="query.payee" />
        <van-cell title="银行名称" :value="query.bank_name" />
        <van-cell title="创建时间" :value="query.createtime" />
        <van-cell title="审核时间" v-if="query.status != 1" :value="query.updatetime" />
      </van-cell-group>
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
      query: "" //列表传来的参数
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.id = this.$route.query.id;
    this.axios
      .post("/api/property_administer/cashInfo", { id: this.id })
      .then(data => {
        this.query = data;
        if (this.query.currency_type == 1) {
          this.type = "余额";
        } else {
          this.type = "奖金";
        }
        //支付方式
        if (this.query.pay_type == 1) {
          this.way = "线下打款";
        } else if (this.query.pay_type == 2) {
          this.way = "微信";
        } else {
          this.way = "支付宝";
        }
        //审核状态
        if (this.query.status == 1) {
          this.audit = "待审核";
        } else if (this.query.status == 2) {
          this.audit = "已打款";
        } else {
          this.audit = "已退回";
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
