<template>
  <div class="detail">
    <navbar title="奖金明细"></navbar>
    <div class="box">
      <van-tabs v-model="tab" @click="getTab">
        <van-tab title="个人业绩奖">
          <div class="null" v-if="list1.length==0">暂无个人业绩奖</div>
          <div class="item" v-for="(item,i) in list1" :key="i">
            <div class="flex">
              <p style="font-size:13px;margin-bottom:10px;color:black;margin-top:2px;">
                {{item.msg}}:
                <i style="color:#fc4c4c">￥{{item.results_money}}</i>
              </p>
              <div style="font-size:13px;color:#fc4c4c;">
                <p style="font-size:13px;margin-bottom:10px;" v-if="item.audit_status==1">待审核</p>
                <p style="font-size:13px;margin-bottom:10px;" v-if="item.audit_status==2">审核通过</p>
                <p style="font-size:13px;margin-bottom:10px;" v-if="item.audit_status==3">审核失败</p>
              </div>
            </div>
            <div style="font-size:14px;color:#fc4c4c">
              <p>本月业绩:￥{{item.before_month_results}}</p>
            </div>
            <div class="flex" style="margin-top:10px;">
              <span>创建时间:{{item.createtime}}</span>
              <span v-if="item.audit_status!=1">结算时间:{{item.cleartime}}</span>
            </div>
          </div>
        </van-tab>
        <van-tab title="团队业绩奖">
          <div class="null" v-if="list2.length==0">暂无团队业绩奖</div>
          <div class="item" v-for="(item,i) in list2" :key="i">
            <div class="flex" style="color:black;font-size:13px;margin-bottom:2px;">
              <span>
                {{item.ceng}}层代理
                <i style="color:#fc4c4c">{{item.msg}}</i> 消费
              </span>
              <p
                style="font-size:13px;margin-bottom:10px;color:#fc4c4c;"
                v-if="item.fulfil_status==1"
              >待审核</p>
              <p
                style="font-size:13px;margin-bottom:10px;color:#fc4c4c;"
                v-if="item.fulfil_status==2"
              >审核通过</p>
              <p
                style="font-size:13px;margin-bottom:10px;color:#fc4c4c;"
                v-if="item.fulfil_status==3"
              >审核失败</p>
            </div>

            <div style="font-size:14px;color:#fc4c4c">
              <p>获得业绩奖:￥{{item.money}}</p>
            </div>
            <p class="flex" style="margin-top:10px;">
              <span>创建时间:{{item.createtime}}</span>
              <span v-if="item.fulfil_status!=1">结算时间:{{item.fulfil_time}}</span>
            </p>
          </div>
        </van-tab>
        <van-tab title="推荐奖" to="tuijianjiang"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import navbar from "@/components/navbar";
export default {
  data() {
    return {
      tab: 0, //类型 0个人业绩 1 团队业绩 3推荐奖
      page1: 1, //个人业绩
      page2: 1, //团队业绩
      list1: [], //个人业绩奖
      list2: [] //团队业绩奖
    };
  },
  components: {
    navbar
  },
  methods: {
    // 个人业绩奖金
    init1() {
      this.axios
        .post("/api/agent/agentResults", {
          page: this.page
        })
        .then(data => {
          this.list1 = data;
        });
    },
    // 团队业绩奖金
    init2() {
      this.axios
        .post("/api/agent/agentTeam", {
          page: this.page2
        })
        .then(data => {
          this.list2 = data;
        });
    },
    // tab切换
    getTab(name) {
      this.tab = name;
      if (name == 0) {
        this.init1();
      } else if (name == 1) {
        this.init2();
      }
    }
  },
  mounted() {
    this.tab = this.$route.query.tab;
    this.init1();
  }
};
</script>
<style lang="less" scoped>
.detail {
  font-size: 14px;
  background: #ffffff;
  .yue {
    margin: 55px 0 15px 0;
    padding: 20px;
    background: #fff;
  }
  .box {
    margin-top: 44px;
    .item {
      padding: 10px 20px;
      background: #fff;
      margin-bottom: 1px;
      border-bottom: 1px solid #f5f5f5;
    }
  }
}
</style>