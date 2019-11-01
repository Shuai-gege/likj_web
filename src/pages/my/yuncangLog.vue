<template>
  <div class="yuncanglog">
    <tabbar title="云仓记录"></tabbar>
    <div class="null" v-if="list.length==0">暂无云仓记录</div>
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="detail">
        <div class="item" v-for="(item,i) in list" :key="i">
          <div class="flex_l name">
            <img :src="item.cover_Image" alt />
            <div style="flex:1;">
              <div class="flex" style="margin-bottom:10px;">
                <p class="username erhang">{{item.goods_name}}</p>
                <p style="color:#fc4c4c;">{{item.change_type==1?'入库':'出库'}}</p>
              </div>
              <div class="flex">
                <p>规格：{{item.size_name}}{{item.size_value}}</p>
                <p>数量：{{item.num}}</p>
              </div>
            </div>
          </div>
          <!-- 说明 -->
          <div class="shuoming" style="margin:15px 0;">
            <!-- <p style="margin:5px 0;align-items:flex-start;" class="flex"> -->
            <p style="margin-bottom:5px;">
              <i style="width:75px;color:#333;">变动记录：</i>
              {{item.msg}}
            </p>
            <p>
              <i style="width:75px;color:#333;">下单时间：</i>
              {{item.createtime}}
            </p>
          </div>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
import pay from "../../components/pay";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  components: {
    tabbar,
    pay,
    MescrollVue // 注册mescroll组件
  },
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
  mounted() {},
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
        .post("/api/cloud/warehouseDetailed", {
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
  }
};
</script>
<style lang="less">
.yuncanglog {
  background-color: #f5f5f5;
  .null {
    background: #f5f5f5;
  }
  .mescroll {
    position: fixed;
    top: 0px;
    bottom: 0;
    height: auto;
  }
  .detail {
    .item {
      border-bottom: 1px solid #f5f5f5;
    }
    margin-top: 44px;
    padding: 15px;
    .name {
      img {
        width: 55px;
        height: 55px;
        border-radius: 10px;
        margin-right: 10px;
      }
      .username {
        font-size: 15px;
        color: #010101;
        width: 85%;
      }
    }
  }
  .shuoming {
    font-size: 13px;
    margin-top: 10px;
    color: #666;
  }
}
</style>