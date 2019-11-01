<template>
  <div class="audit">
    <navbar title="审核授权"></navbar>
    <div class="null" v-if="list.length==0">暂无授权记录</div>
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="content">
        <div
          class="flex box"
          v-for="(item,index) in list"
          :key="index"
          @click="tap(item.invite_agent_id)"
        >
          <div class="flex_l">
            <img :src="item.wx_avatar" alt />
            <div>
              <p style="color:black;font-size:16px;margin-bottom:5px;">{{item.wx_nickname}}</p>
              <p>申请级别：{{item.level_name}}</p>
            </div>
          </div>
          <div style="text-align:right;">
            <span style="color:#fc4c4c" v-if="item.man_check_status==1">未审核</span>
            <span style="color:#fc4c4c" v-if="item.man_check_status==2">审核通过</span>
            <span style="color:#fc4c4c" v-if="item.man_check_status==3">审核失败</span>
            <p style="font-size:13px;margin-top:5px;">{{item.createtime}}</p>
          </div>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>
<script>
import navbar from "@/components/navbar";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  data() {
    return {
      list: [],
      mescroll: null, // mescroll实例对象
      mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
      }
    };
  },

  components: {
    navbar,
    MescrollVue // 注册mescroll组件
  },

  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      console.log(page);
      // this.init(page.num, mescroll);
      this.axios
        .post("/api/agent/agentEmpower", {
          page: page.num
        })
        .then(data => {
          // this.list = data;
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
    },
    tap(id) {
      this.$router.push({
        path: "/authorization",
        query: {
          id: id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.audit {
  font-size: 14px;
  .mescroll {
    position: fixed;
    top: 0px;
    bottom: 0;
    height: auto;
  }
  .content {
    margin-top: 44px;
    .box {
      width: 94%;
      padding: 10px 0;
      margin: 0 auto 10px;
      border-bottom: 1px solid #f5f5f5;
    }
    img {
      width: 60px;
      height: 60px;
      border-radius: 7px;
      margin-right: 10px;
    }
  }
}
</style>