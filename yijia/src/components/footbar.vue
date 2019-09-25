<template>
  <footer>
    <van-tabbar v-model="active" active-color="#f8442d" :route="true">
      <van-tabbar-item to="/">
        <span>首页</span>
        <img
          slot="icon"
          slot-scope="props"
          :class="props.active ?'active':''"
          :src="props.active ? icon.homeActive : icon.homeNormal"
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
      <van-tabbar-item to="/hot">
        <span>热卖商品</span>
        <img slot="icon" slot-scope="props" :class="props.active ?'active':''" :src="props.active ? icon.hotActive : icon.hotNormal" />
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
      <van-tabbar-item to="/my">
        <span>我的</span>
        <img slot="icon" slot-scope="props" :class="props.active ?'active':''" :src="props.active ? icon.myActive : icon.myNormal" />
      </van-tabbar-item>
    </van-tabbar>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      icon: {
        homeNormal: require("@images/footbar/1.png"), //未选中
        homeActive: require("@images/footbar/1-1.png"), //选中

        orderNormal: require("@images/footbar/2.png"),
        orderActive: require("@images/footbar/2-2.png"),

        hotNormal: require("@images/footbar/3.png"),
        hotActive: require("@images/footbar/3-3.png"),

        moneyNormal: require("@images/footbar/4.png"),
        moneyActive: require("@images/footbar/4-4.png"),

        myNormal: require("@images/footbar/5.png"),
        myActive: require("@images/footbar/5-5.png")
      }
    };
  }
};
</script>

<style scoped lang="less">
footer {
  box-shadow: 0px 0px 1px 0px rgba(229, 229, 229, 1);
  .van-tabbar-item__icon img {
    height: 0.5rem;
  }
  .van-tabbar-item__icon img.active {
    height: 0.6rem;
  }
}
</style>
