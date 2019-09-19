<template>
  <div class="box">
    <!-- 遮罩层 -->
    <van-button type="primary" @click="showPopup" icon="bars"></van-button>
    <van-popup v-model="show" position="top" :style="{ height: '100%' ,width:'50%'}">
      <!-- 头像 -->
      <!-- 信息，购物车 -->
      <van-icon name="manager" />
      <span class="txt txt-1">我的</span>
      <van-icon name="setting" />
      <span class="txt txt-2">设置</span>
      <van-icon name="cart" />
      <span class="txt txt-3">购物车</span>
    </van-popup>
    <!-- 搜索框 -->
    <form action="/" class="SouSuo">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        background="#90d7ec"
        shape="round"
      />
    </form>
    <p>我是热卖商品</p>
  </div>
</template>
<script>
import Vue from "vue";
import { Popup, Icon } from "vant";
Vue.use(Popup).use(Icon);
export default {
  data() {
    return {
      show: false
    };
  },

  methods: {
    showPopup() {
      this.show = true;
    }
  }
};
</script>
<style lang="stylus" scoped>
.van-icon-manager, .van-icon-setting, .van-icon-cart {
  display: block;
  margin-top: 15px;
  margin-left: 15px;
}

.txt {
  font-size: 12px;
}

.txt-1 {
  position: absolute;
  left: 45px;
  top: 16px;
}

.txt-2 {
  position: absolute;
  left: 45px;
  top: 46px;
}

.txt-3 {
  position: absolute;
  left: 45px;
  top: 76px;
}
</style>