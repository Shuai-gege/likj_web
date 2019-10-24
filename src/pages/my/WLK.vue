<template>
  <div class="wlk">
    <navbar title="团队活动"></navbar>
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="box">
        <van-panel title="活动名称:" :desc="item.activity_name" v-for="(item,i) in list" :key="i">
          <div class="con">
            <p style="font-size:14px;">活动详情:</p>
            <p style="font-size:14px;color:#323233;margin-top:10px;">{{item.activity_content}}</p>
            <van-divider />
            <p style="padding-bottom:10px;">活动时间: {{item.start_time}} 至 {{item.end_time}}</p>
          </div>
        </van-panel>
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
        .post("/api/agent_team/teamActivity", {
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
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.wlk {
  height: 100vh;
  background: #f5f5f5;
  .mescroll {
    position: fixed;
    top: 0px;
    bottom: 0;
    height: auto;
  }
  .box {
    margin-top: 44px;
    width: 100%;
    background: #f5f5f5;
    padding-top: 8px;
    .van-cell {
      border-radius: 15px;
      padding: 10px;
    }
    .van-cell__title,
    .van-panel[data-v-36e30337] {
      border-radius: 15px;
      width: 96%;
      margin-left: 2%;
    }
    .van-cell__label {
      font-size: 14px;
      color: #fc4c4c;
    }
    .con {
      width: 92%;
      margin-left: 4%;
    }
    .van-panel {
      margin-bottom: 5px;
    }
  }
}
</style>