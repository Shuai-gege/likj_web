<template>
  <div class="detail">
    <navbar :title="name"></navbar>
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="box">
        <div class="null" v-if="list.length==0">暂无记录</div>
        <div class="flex minxi" v-for="(item,i) in list" :key="i">
          <div>
            <p style="font-size:13px;margin-bottom:10px;color:black;">{{item.msg}}</p>
            <p style="font-size:13px;color:#CDC9C9;">
              <span>{{item.createtime}}</span>
            </p>
          </div>
          <div>
            <p style="font-size:14px;color:#04BE02" v-if="item.fluctuate_type == 1" class="flex_r">
              +
              <img src="../../image/图标/jinbi.png" alt class="money" />
              {{item.amount}}
            </p>
            <p style="font-size:14px;color:#fc4c4c" v-if="item.fluctuate_type == 2" class="flex_r">
              -
              <img src="../../image/图标/jinbi.png" alt class="money" />
              {{item.amount}}
            </p>
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
      name: "", //title名
      list: [], //请求数据
      type: "", //1余额，2货款，3奖金，4保证金
      name: "", //title名字

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
        .post("/api/property_administer/propertyDetails", {
          page: page.num,
          assets_type: this.type
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
  mounted() {
    this.type = this.$route.query.type;
    if (this.type == 1) {
      this.name = "余额";
    } else if (this.type == 2) {
      this.name = "货款";
    } else {
      this.name = "保证金";
    }
  }
};
</script>
<style lang="less" scoped>
.detail {
  font-size: 14px;
  background: #f5f5f5;
  /deep/.mescroll-upwarp {
    background: #f5f5f5 !important;
  }
  .null {
    background: #f5f5f5;
  }
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
    background: #f5f5f5;
    min-height: 100vh;
    padding-bottom: 5px;
    .minxi {
      padding: 10px 20px;
      background: #fff;
      width: 94%;
      margin: 0 auto;
      margin-top: 10px;
      border-radius: 5px;
      .money {
        margin-right: 8px;
        width: 15px;
        height: 15px;
      }
    }
  }
}
</style>