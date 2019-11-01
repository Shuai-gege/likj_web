<template>
  <div class="detail">
    <navbar title="奖金明细"></navbar>
    <div class="box">
      <van-tabs v-model="tab" @click="getTab" :sticky="true" :offset-top="44">
        <van-tab title="邀请奖">
          <div class="null" v-if="list.length==0">暂无邀请奖</div>
          <div class="flex minxi kuai" v-for="(item,i) in list" :key="i">
            <div>
              <p style="font-size:13px;margin-bottom:10px;color:black;text-align:left;">{{item.msg}}</p>
              <p style="font-size:13px;color:#CDC9C9;text-align:left;">
                <span>创建时间：{{item.createtime}}</span>
              </p>
            </div>
            <div style="font-size:14px;color:#fc4c4c">
              <p style="font-size:13px;color:#F59969;" class="flex">
                <img src="../../image/图标/jinbi.png" alt />
                {{item.bonus_money}}
              </p>
              <p style="font-size:13px;" v-if="item.audit_status==1">待审核</p>
              <p style="font-size:13px;color:#07C160;" v-if="item.audit_status==2">审核通过</p>
              <p style="font-size:13px;" v-if="item.audit_status==3">审核失败</p>
            </div>
          </div>
        </van-tab>
        <van-tab title="邀请后续奖">
          <div class="null" v-if="list2.length==0">暂无邀请后续奖</div>
          <div class="item kuai" v-for="(item,i) in list2" :key="i">
            <div class="flex" style="color:black;font-size:13px;margin-bottom:2px;">
              <span>{{item.msg}}</span>

              <p
                style="font-size:13px;margin-bottom:10px;color:#fc4c4c;"
                v-if="item.invite_status==1"
              >待审核</p>
              <p
                style="font-size:13px;margin-bottom:10px;color:#07C160;"
                v-if="item.invite_status==2"
              >审核通过</p>
              <p
                style="font-size:13px;margin-bottom:10px;color:#fc4c4c;"
                v-if="item.invite_status==3"
              >审核失败</p>
            </div>

            <div class="flex" style="margin-top:10px;">
              <span>创建时间:{{item.createtime}}</span>
              <p style="font-size:13px;color:#F59969;" class="flex">
                <img src="../../image/图标/jinbi.png" alt />
                {{item.invite_money}}
              </p>
            </div>
          </div>
        </van-tab>
        <van-tab title="团队业绩奖">
          <div class="null" v-if="list1.length==0">暂无团队业绩奖</div>
          <div class="item kuai" v-for="(item,i) in list1" :key="i">
            <div class="flex">
              <p
                style="font-size:13px;margin-bottom:10px;color:black;margin-top:2px;"
                class="flex_l"
              >
                {{item.msg}}:
                <i style="color:#F59969" class="flex_l">
                  <img src="../../image/图标/jinbi.png" alt />
                  {{item.results_money}}
                </i>
              </p>
              <div style="font-size:13px;color:#fc4c4c;">
                <p style="font-size:13px;margin-bottom:10px;" v-if="item.audit_status==1">待审核</p>
                <p
                  style="font-size:13px;margin-bottom:10px;color:#07C160;"
                  v-if="item.audit_status==2"
                >审核通过</p>
                <p style="font-size:13px;margin-bottom:10px;" v-if="item.audit_status==3">审核失败</p>
              </div>
            </div>
            <div style="font-size:14px;color:#fc4c4c">
              <p style="font-size:13px;color:#F59969;" class="flex_l">
                本月业绩:
                <i class="flex_l">
                  <img src="../../image/图标/jinbi.png" alt />
                  {{item.before_month_results}}
                </i>
              </p>
            </div>
            <div class="flex" style="margin-top:10px;">
              <span>创建时间:{{item.createtime}}</span>
              <span v-if="item.audit_status!=1">{{item.cleartime}}</span>
            </div>
          </div>
        </van-tab>
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
      list2: [], //后续邀请奖
      list: [] //邀请奖
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
    // 后续邀请奖
    init2() {
      this.axios
        .post("/api/agent/inviteMoney", {
          page: this.page2
        })
        .then(data => {
          this.list2 = data;
        });
    },
    // 邀请奖
    init() {
      this.axios
        .post("/api/agent/agentDetail", {
          page: this.page
        })
        .then(data => {
          this.list = data;
        });
    },
    // tab切换
    getTab(name) {
      this.tab = name;
      if (name == 1) {
        this.init1();
      } else if (name == 2) {
        this.init2();
      }
    }
  },
  mounted() {
    this.tab = this.$route.query.tab;
    this.init();
  }
};
</script>
<style lang="less" scoped>
.detail {
  img {
    margin-right: 8px;
    width: 15px;
    height: 15px;
  }
  font-size: 14px;
  background: #f5f5f5;
  min-height: 100vh;
  .null {
    background: #f5f5f5;
  }
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
    .minxi {
      padding: 10px 20px;
      background: #fff;
      margin-bottom: 1px;
      text-align: right;
      i {
        color: #fc4c4c;
      }
    }
    .kuai {
      border-radius: 5px;
      width: 96%;
      margin: 0 auto;
      margin-top: 10px;
    }
  }
}
</style>