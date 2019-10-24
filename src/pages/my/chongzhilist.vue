<template>
  <div class="detail">
    <navbar title="充值记录"></navbar>
    <div class="null" v-if="list.length==0">暂无充值记录</div>
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="box">
        <div
          class="flex minxi"
          v-for="(item,i) in list"
          :key="i"
          @click="todetail(item.recharge_id)"
        >
          <div>
            <p
              style="font-size:13px;margin-bottom:10px;color:black;"
            >充值到{{item.recharge_way==1?'余额':'货款'}}</p>
            <p style="font-size:13px;color:#CDC9C9;">
              <span>{{item.createtime}}</span>
            </p>
          </div>
          <div>
            <p style="font-size:14px;color:#fc4c4c;text-align:right">{{item.amount}}</p>
            <p style="font-size:14px;color:#fc4c4c;text-align:right" v-if="item.status==1">待审核</p>
            <p style="font-size:14px;color:#fc4c4c;text-align:right" v-if="item.status==2">已审核</p>
            <p style="font-size:14px;color:#fc4c4c;text-align:right" v-if="item.status==3">审核失败</p>
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
      list: [], // 请求数据
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
        .post("/api/property_administer/rechargeList", {
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
    todetail(id) {
      this.$router.push({
        path: "/recordinfo",
        query: {
          id: id
        }
      });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.detail {
  font-size: 14px;
  background: #f5f5f5;
  .mescroll {
    position: fixed;
    top: 0px;
    bottom: 0;
    height: auto;
  }
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