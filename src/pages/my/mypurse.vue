<template>
  <div class="mypurse">
    <navbar title="我的钱包"></navbar>
    <!-- 余额 -->
    <div class="zonge">
      <p class="flex">
        钱包总额（RMB）
        <span
          style="font-size:12px;padding:5px 10px;background:#FDC083;color:#fff;border-radius:5px;"
          @click="$router.push('/moneydetail')"
        >资金明细</span>
      </p>
      <p style="font-size:30px;">{{initdata.money}}</p>
    </div>
    <!-- 可提现，货款，奖金 -->
    <div class="tixian">
      <van-cell title="可提现余额" is-link :value="initdata.money" @click="tap(1)" />
      <van-cell title="货款" is-link :value="initdata.payment_for_goods" @click="tap(2)" />
      <van-cell title="奖金" is-link :value="initdata.bonus" @click="$router.push('/bonus')" />
      <van-cell title="保证金" is-link :value="initdata.margin" @click="tap(4)" />
    </div>
    <p style="margin:10px 0 10px 20px;">更多</p>
    <!-- 收款账号、利润 -->
    <div class="lirun">
      <!-- <van-cell title="收款账号设置" is-link to="/myshoukuan" /> -->
      <van-cell title="充值记录" is-link @click="chongzhi" />
      <van-cell title="提现记录" is-link @click="tixian" />
      <!-- <van-cell title="利润明细" is-link @click="tap(4)" /> -->
    </div>
    <!-- 按钮 -->
    <!-- <van-button
      type="primary"
      size="large"
      color="#fc4c4c"
      to="/topup"
      style="margin-bottom:10px;"
    >充值</van-button>

    <van-button
      type="primary"
      size="large"
      color="#F19553"
      to="/tixian"
      style="margin-bottom:30px;"
    >提现</van-button>-->
  </div>
</template>
<script>
import navbar from "@/components/navbar";
export default {
  data() {
    return {
      value: 1,
      type: "", //1余额，2货款，4保证金
      type1: "", //1提交，2查看
      initdata: "", //后台数据
      type2: "" //1充值记录，2提现记录
    };
  },
  components: {
    navbar
  },
  mounted() {
    this.axios.post("/api/user/index").then(data => {
      console.log(data);
      this.initdata = data;
    });
  },
  methods: {
    tap(type) {
      this.$router.push({
        path: "/mydetail",
        query: {
          type
        }
      });
    },

    chongzhi() {
      this.$router.push({
        path: "/chongzhilist"
      });
    },
    tixian() {
      this.$router.push({
        path: "/tixianlist"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.mypurse {
  background: #f5f5f5;
  min-height: 100vh;
  padding-top: 45px;
  .zonge {
    margin-top: -1px;
    color: #fdc083;
    background: #182128;
    padding: 20px;
  }
  .tixian {
    margin: 10px 0;
  }
  .lirun {
    margin-bottom: 50px;
  }
}
</style>