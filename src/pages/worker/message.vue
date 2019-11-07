<template>
  <div class="message">
    <!-- 头部公共搜索框 -->
    <tabbar title="消息中心"></tabbar>
    <div class="null" v-if="list.length==0">暂无消息</div>
    <!--mescroll滚动区域的基本结构-->
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <!--内容...-->

      <div class="content">
        <!-- 分割不迷路 -->
        <div
          class="item flex_l"
          v-for="(item,i) in list"
          :key="i"
          @click="topage('/'+item.web,item.relevance_id)"
        >
          <img v-if="Number(item.type)<5" src="../../image/消息/xiaoxi1.png" alt />
          <img
            v-if="Number(item.type)==5||Number(item.type)==6"
            src="../../image/消息/goumai.png"
            alt
          />
          <img
            v-if="Number(item.type)>=7&&Number(item.type)<=9"
            src="../../image/消息/xiaoxi.png"
            alt
          />
          <img v-if="Number(item.type)>9" src="../../image/消息/xiaoxi1.png" alt />
          <div style="flex:1">
            <p class="flex" style="font-size:16px;color:black">
              <span>{{item.msg}}</span>
            </p>
            <p style="font-size:12px;color:#c1c1c1;width:100%;text-align:right;">{{item.createtime}}</p>
          </div>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  data() {
    return {
      page: 1,
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
    tabbar,
    MescrollVue // 注册mescroll组件
  },
  mounted() {
    // this.init();
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
        .post("/api/msg_push/msgList", {
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
    // 跳转详情
    topage(path, id) {
      this.$router.push({
        path: path,
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.message {
  padding-top: 44px;
  .null {
    background-color: #fff;
  }
  .mescroll {
    position: fixed;
    top: 44px;
    bottom: 0;
    height: auto;
  }
  .content {
    .item {
      padding: 10px;
      border-bottom: 1px solid #f5f6f7;
      width: 96%;
      margin: 0 auto;
      img {
        width: 40px;
        height: 40px;
        border-radius: 5px;
        margin-right: 15px;
      }
    }
  }
}
</style>
