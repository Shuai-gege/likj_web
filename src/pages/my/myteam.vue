<template>
  <div class="myteam">
    <navbar title="我的团队"></navbar>
    <div class="content">
      <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
        <van-tabs v-model="active" sticky :offset-top="44" @click="clicktab">
          <van-tab :title="'我的团队' + '(' + z_Num + ')'">
            <div class="null" v-if="list.length==0">暂无团队</div>
            <div class="direct flex" v-for="(item,i) in list" :key="i">
              <div class="flex_l">
                <img :src="item.wx_avatar" alt />
                <div class="txt">
                  <div style="color:#333;margin-bottom:10px;">
                    {{item.wx_nickname}}
                    <i>({{item.agent_name}})</i>
                    <p class="tel" v-if="oShow.agent_mobile == 1">
                      <van-icon name="phone" size="8" color="#999" />
                      {{item.mobile}}
                    </p>
                    <p class="time">{{item.starttime}}</p>
                  </div>
                </div>
              </div>
              <div class="oMoney">
                <p class="oBouns" v-if="oShow.agent_hk == 1">
                  货款：
                  <i>{{item.payment_for_goods}}</i>
                </p>
                <p class="oBouns" v-if="oShow.agent_gryj == 1">
                  个人业绩：
                  <i>{{item.results}}</i>
                </p>
                <p class="oBouns" v-if="oShow.agent_tdyj == 1">
                  团队业绩：
                  <i>{{item.team_results}}</i>
                </p>
              </div>
            </div>
          </van-tab>
          <van-tab :title="'直接代理' + '(' + zNum + ')'">
            <div class="null" v-if="list.length==0">暂无直接代理</div>
            <div class="direct flex" v-for="(item,i) in list" :key="i">
              <div class="flex_l">
                <img :src="item.wx_avatar" alt />
                <div class="txt">
                  <div style="color:#333;margin-bottom:10px;">
                    {{item.wx_nickname}}
                    <i>({{item.agent_name}})</i>
                    <p class="tel" v-if="oShow.agent_mobile == 1">
                      <van-icon name="phone" size="8" color="#999" />
                      {{item.mobile}}
                    </p>
                    <p class="time">{{item.starttime}}</p>
                  </div>
                </div>
              </div>
              <div class="oMoney">
                <p class="oBouns" v-if="oShow.agent_hk == 1">
                  货款：
                  <i>{{item.payment_for_goods}}</i>
                </p>
                <p class="oBouns" v-if="oShow.agent_gryj == 1">
                  个人业绩：
                  <i>{{item.results}}</i>
                </p>
                <p class="oBouns" v-if="oShow.agent_tdyj == 1">
                  团队业绩：
                  <i>{{item.team_results}}</i>
                </p>
              </div>
            </div>
          </van-tab>
          <van-tab :title="'间接代理' + '(' + jNum + ')'">
            <div class="null" v-if="list.length==0">暂无间接代理</div>
            <div class="direct flex" v-for="(item,i) in list" :key="i">
              <div class="flex_l">
                <img :src="item.wx_avatar" alt />
                <div class="txt">
                  <div style="color:#333;margin-bottom:10px;">
                    {{item.wx_nickname}}
                    <i>({{item.agent_name}})</i>
                    <p class="tel" v-if="oShow.agent_mobile == 1">
                      <van-icon name="phone" size="8" color="#999" />
                      {{item.mobile}}
                    </p>
                    <p class="time">{{item.starttime}}</p>
                  </div>
                </div>
              </div>
              <div class="oMoney">
                <p class="oBouns" v-if="oShow.agent_hk == 1">
                  货款：
                  <i>{{item.payment_for_goods}}</i>
                </p>
                <p class="oBouns" v-if="oShow.agent_gryj == 1">
                  个人业绩：
                  <i>{{item.results}}</i>
                </p>
                <p class="oBouns" v-if="oShow.agent_tdyj == 1">
                  团队业绩：
                  <i>{{item.team_results}}</i>
                </p>
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
      active: 0, //0全部代理，1直接代理，2间接代理
      page: "1", //代理分页
      list: [],

      mescrollUp: {
        callback: this.upCallback
      },
      mescroll: null,
      oShow: "", //是否显示
      zNum: "", //直接代理人数
      jNum: "", //简介代理数
      z_Num: ""
    };
  },
  components: {
    navbar,
    MescrollVue
  },
  mounted() {
    this.active = this.$route.query.type;
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      console.log(page);
      this.axios
        .post("/api/agent_team/myLowerLevel", {
          page: page.num,
          type: this.active + 1
        })
        .then(data => {
          //直接代理数
          this.zNum = data.directly_count;
          // 间接代理
          this.jNum = data.indirect_count;
          // 我的团队人数
          this.z_Num = this.zNum + this.jNum;

          // 是否显示
          this.oShow = data.agent_set;
          // 请求的列表数据
          let arr = data.user_list;
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
    },
    // init() {
    //   this.axios
    //     .post("/api/agent_team/myLowerLevel", {
    //       type: this.active + 1,
    //       page: this.page
    //     })
    //     .then(data => {
    //       this.list = data;
    //     });
    // },
    //点击tab切换
    clicktab(name) {
      console.log(name);
      this.mescroll.resetUpScroll();
    }
  }
};
</script>
<style lang="less" scoped>
.myteam {
  .null {
    background: #fff;
  }
  .mescroll {
    position: fixed;
    top: 44px;
    bottom: 0;
    height: auto;
  }
  .content {
    margin-top: 46px;
    .oMoney {
      width: 120px;
      .oBouns {
        text-align: left;
      }
    }
    .direct {
      background: #fff;
      padding: 0 10px 0 20px;
      i {
        font-size: 12px;
        color: #fc4c4c;
      }
      img {
        width: 45px;
        height: 45px;
        border-radius: 10px;
      }
      .txt {
        padding: 10px 0 0 10px;
        font-size: 14px;
        .tel {
          font-size: 12px;
          color: #999;
        }
        .time {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>