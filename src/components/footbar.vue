<template>
  <footer>
    <van-tabbar v-model="active" active-color="#FF6159" :route="true">
      <van-tabbar-item to="/">
        <span>首页</span>
        <img
          slot="icon"
          slot-scope="props"
          :class="props.active ?'active':''"
          :src="props.active ? icon.homeActive : icon.homeNormal"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/goodsList">
        <span>热卖商品</span>
        <img
          slot="icon"
          slot-scope="props"
          :class="props.active ?'active':''"
          :src="props.active ? icon.hotActive : icon.hotNormal"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/school">
        <span v-if="$route.name!='school'">商学院</span>
        <img
          slot="icon"
          slot-scope="props"
          :class="props.active ?'active':''"
          id="solo"
          :src="props.active ? icon.schoolActive : icon.schoolNormal"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/car">
        <span>购物车</span>
        <img
          slot="icon"
          slot-scope="props"
          :class="props.active ?'active':''"
          :src="props.active ? icon.moneyActive : icon.moneyNormal"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/worker">
        <span>工作台</span>
        <img
          slot="icon"
          slot-scope="props"
          :class="props.active ?'active':''"
          :src="props.active ? icon.orderActive : icon.orderNormal"
        />
      </van-tabbar-item>
      <!-- <van-tabbar-item to="/my" v-if="model!=2">
        <span>我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :class="props.active ?'active':''"
          :src="props.active ? icon.myActive : icon.myNormal"
        />
      </van-tabbar-item>-->
    </van-tabbar>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      model: "", //模式  2 非云仓
      active: 0,
      worker: "", //未处理消息数
      my: "", //待处理消息数
      icon: {
        homeNormal: require("@images/footbar/1.png"), //未选中
        homeActive: require("@images/footbar/1-1.png"), //选中

        orderNormal: require("@images/footbar/2.png"),
        orderActive: require("@images/footbar/2-2.png"),

        schoolNormal: require("@images/footbar/5.png"),
        schoolActive: require("@images/footbar/5-5.png"),

        hotNormal: require("@images/footbar/3.png"),
        hotActive: require("@images/footbar/3-3.png"),

        moneyNormal: require("@images/footbar/4.png"),
        moneyActive: require("@images/footbar/4-4.png")
      }
    };
  },
  mounted() {
    this.model = localStorage.getItem("model");
    // this.axios.post("/api/outstand_order/outorder").then(data => {
    //   this.worker =
    //     data.audit_agent + //待审核数量
    //     data.recharge + //待处理充值订单
    //     data.cash; //待处理提现订单
    //   this.my =
    //     data.lower_order + //待处理下级订单
    //     data.yun_order + //待处理云仓支付订单
    //     data.pick_order; //待处理提货支付订单
    // });
  }
};
</script>

<style scoped lang="less">
footer {
  box-shadow: 0px 0px 1px 0px rgba(229, 229, 229, 1);
  .van-tabbar-item {
    position: relative;
    z-index: 10;
  }
  .van-tabbar-item__icon img {
    height: 0.5rem;
  }
  .van-tabbar-item__icon img.active {
    height: 0.6rem;
  }
  #solo {
    &.active {
      height: 30px;
    }
  }
}
</style>
