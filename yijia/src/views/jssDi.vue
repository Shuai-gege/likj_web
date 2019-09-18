<template>
  <div class="box">
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="send-gift" to="/jsszhongjian">首页</van-tabbar-item>
      <van-tabbar-item name="cluster" icon="hot">热卖商品</van-tabbar-item>
      <van-tabbar-item name="friends" icon="shopping-cart" to="jssCary">购物车</van-tabbar-item>
      <van-tabbar-item name="setting" icon="smile" to="My">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="stylus" scoped></style>