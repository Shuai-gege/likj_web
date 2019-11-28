<template>
  <div class="detail">
    <navbar title="奖金明细"></navbar>
    <div class="box">
      <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
        <van-tabs v-model="active" @click="getTab" :sticky="true" :offset-top="44">
          <van-tab title="邀请奖">
            <div class="null" v-if="list.length==0">暂无邀请奖</div>
            <div class="flex minxi kuai" v-for="(item,i) in list" :key="i">
              <div>
                <p
                  style="font-size:13px;margin-bottom:10px;color:black;text-align:left;"
                >{{item.msg}}</p>
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
      </mescroll-vue>
    </div>
  </div>
</template>
<script>
import navbar from "@/components/navbar";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  data() {
    return {
      active: 0, //类型 0邀请奖 1邀请后续奖 2团队业绩奖
      list1: [], //个人业绩奖
      list2: [], //后续邀请奖
      list: [], //邀请奖
      mescrollUp: {
        callback: this.upCallback
      },
      mescroll: null
    };
  },
  components: {
    navbar,
    MescrollVue
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      console.log(page);
      if (this.active == 0) {
        this.axios
          .post("/api/agent/agentDetail", {
            page: page.num
          })
          .then(data => {
            // 请求的列表数据
            let arr = data;
            // 如果是第一页需手动置空列表
            if (page.num === 1) {
              this.list = [];
            }
            // 把请求到的数据添加到列表
            this.list = this.list.concat(arr);
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length, true);
            });
          })
          .catch(e => {
            // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            mescroll.endErr();
          });
      } else if (this.active == 1) {
        this.axios
          .post("/api/agent/inviteMoney", {
            page: page.num
          })
          .then(data => {
            // 请求的列表数据
            let arr = data;
            // 如果是第一页需手动置空列表
            if (page.num === 1) {
              this.list2 = [];
            }
            // 把请求到的数据添加到列表
            this.list2 = this.list2.concat(arr);
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length, true);
            });
          })
          .catch(e => {
            // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            mescroll.endErr();
          });
      } else if (this.active == 2) {
        this.axios
          .post("/api/agent/agentResults", {
            page: page.num
          })
          .then(data => {
            // 请求的列表数据
            let arr = data;
            // 如果是第一页需手动置空列表
            if (page.num === 1) {
              this.list1 = [];
            }
            // 把请求到的数据添加到列表
            this.list1 = this.list1.concat(arr);
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              mescroll.endSuccess(arr.length, true);
            });
          })
          .catch(e => {
            // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            mescroll.endErr();
          });
      }
    },
    // tab切换
    getTab(name) {
      this.mescroll.resetUpScroll();
    }
  },
  mounted() {
    this.active = this.$route.query.tab;
  }
};
</script>
<style lang="less" scoped>
.detail {
  .mescroll {
    position: fixed;
    top: 44px;
    bottom: 0;
    height: auto;
  }
  img {
    margin-right: 8px;
    width: 15px;
    height: 15px;
  }
  font-size: 14px;
  background: #f5f5f5;
  min-height: 100vh;

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