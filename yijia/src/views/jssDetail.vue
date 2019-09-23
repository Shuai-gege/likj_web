<template>
  <div class="box">
    <!-- 头部 -->
    <van-nav-bar title="详情页" left-text="返回" left-arrow @click-left="onClickLeft" />

    <!-- 中间部分 -->
    <van-row>
      <van-col span="24">
        <van-swipe @change="onChange" class="Show">
          <van-swipe-item class="Show1">1</van-swipe-item>
          <van-swipe-item class="Show1">2</van-swipe-item>
          <van-swipe-item class="Show1">3</van-swipe-item>
          <van-swipe-item class="Show1">4</van-swipe-item>
          <div class="custom-indicator" slot="indicator">{{ current + 1 }}/4</div>
        </van-swipe>
      </van-col>
      <van-col span="24">价格位置</van-col>
      <van-col span="24">商品名称位置</van-col>
      <van-col span="24">收货地址位置</van-col>
      <van-col span="24">服务 7天无理由退换货位置</van-col>
      <van-col span="24">选择尺寸位置</van-col>
      <van-col span="24">服务 7天无理由退换货位置</van-col>
      <van-col span="24">产品参数位置</van-col>
    </van-row>
    <!-- 尾部 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>
<script>
import Vue from "vue";
import {
  NavBar,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Row,
  Col,
  Swipe,
  SwipeItem
} from "vant";
Vue.use(NavBar)
  .use(Row)
  .use(Col)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Swipe)
  .use(SwipeItem);
export default {
  data() {
    return { current: 0 };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onChange(index) {
      this.current = index;
    }
  }
};
</script>
<style lang="stylus" scoped>
.Show {
  height: 18.75rem;
}
</style>