<template>
  <div class="detail">
    <navbar title="充值记录"></navbar>
    <div class="box">
      <div class="flex minxi" v-for="(item,i) in list" :key="i">
        <div>
          <p style="font-size:13px;margin-bottom:10px;color:black;">{{item.msg}}</p>
          <p style="font-size:13px;color:#CDC9C9;">
            <span>{{item.createtime}}</span>
          </p>
        </div>
        <div>
          <!-- <p style="font-size:12px;">{{list.createtime}}</p> -->
          <p style="font-size:14px;color:#fc4c4c" v-if="item.fluctuate_type == 1">+{{item.amount}}</p>
          <p style="font-size:14px;color:#fc4c4c" v-if="item.fluctuate_type == 2">-{{item.amount}}</p>
        </div>
      </div>
    </div>

    <!-- 分割线
    <div class="flex mingxi">
      <div>
        <p>{{name}}</p>
        <p style="font-size:12px;color:#fc4c4c">
          <b>{{name1}}:0.00</b>
        </p>
      </div>
      <div>
        <p>2019-09-30</p>
        <p style="font-size:13px;color:#fc4c4c">-8.50</p>
      </div>
    </div>-->
  </div>
</template>
<script>
import navbar from "@/components/navbar";
export default {
  data() {
    return {
      page: "1", //资金页数
      list: [], //请求数据
      type: "" //1余额，2货款，3奖金，4保证金
    };
  },
  components: {
    navbar
  },
  methods: {},
  mounted() {
    this.type = this.$route.query.type2;
    if (this.type == 1) {
      this.name = "充值记录";
    } else if (this.type == 2) {
      this.name = "提现记录";
    }
    this.axios
      .post("/api/property_administer/propertyDetails", {
        page: this.page,
        assets_type: this.type
      })
      .then(data => {
        this.list = data;
      });
  }
};
</script>
<style lang="less" scoped>
.detail {
  font-size: 14px;
  background: #f5f5f5;
  .yue {
    margin: 55px 0 15px 0;
    padding: 20px;
    background: #fff;
  }
  .box {
    margin-top: 44px;
    .minxi {
      padding: 10px 20px;
      background: #fff;
      margin-bottom: 1px;
    }
  }
}
</style>