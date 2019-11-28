<template>
  <div class="myteam">
    <navbar title="我的团队"></navbar>
    <div class="content">
      <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
        <van-tabs v-model="active" sticky :offset-top="44" @click="clicktab">
          <van-tab :title="active==0?'我的团队('+list.length + ')':'我的团队'">
            <div class="null" v-if="list.length==0">暂无团队</div>
            <div class="direct flex_l" v-for="(item,i) in list" :key="i">
              <img :src="item.wx_avatar" alt />
              <div class="txt">
                <div style="color:#333;margin-bottom:10px;">
                  {{item.wx_nickname}}
                  <p>代理等级：{{item.agent_name}}</p>
                  <span>时间：{{item.starttime}}</span>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab :title="active==1?'直接代理('+list.length + ')':'直接代理'">
            <div class="null" v-if="list.length==0">暂无直接代理</div>
            <div class="direct flex_l" v-for="(item,i) in list" :key="i">
              <img :src="item.wx_avatar" alt />
              <div class="txt">
                <div style="color:#333;margin-bottom:10px;">
                  {{item.wx_nickname}}
                  <p>代理等级：{{item.agent_name}}</p>
                  <span>时间：{{item.starttime}}</span>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab :title="active==2?'间接代理('+list.length + ')':'间接代理'">
            <div class="null" v-if="list.length==0">暂无间接代理</div>
            <div class="direct flex_l" v-for="(item,i) in list" :key="i">
              <img :src="item.wx_avatar" alt />
              <div class="txt">
                <div style="color:#333;margin-bottom:10px;">
                  {{item.wx_nickname}}
                  <p>代理等级：{{item.agent_name}}</p>
                  <span>时间：{{item.starttime}}</span>
                </div>
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
      mescroll: null
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
    .direct {
      background: #fff;
      padding: 0 0 0 20px;
      img {
        width: 60px;
        height: 60px;
        border-radius: 10px;
      }
      .txt {
        padding: 10px 0 0 10px;
        font-size: 14px;
        span {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>