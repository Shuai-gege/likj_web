<template>
  <div class="box">
    <div>
      <div class="head flex">
        <van-button type="primary" @click="showPopup" icon="bars" class="geren"></van-button>
        <div class="search">
          <input class="sear" placeholder="请输入搜索关键字" />
          <van-icon name="search" />
        </div>
        <div class="text">取消</div>
      </div>
      <van-popup v-model="show" position="left" :style="{ height: '100%' ,width:'50%'}">
        <!-- 头像 -->
        <div class="logo">
          <van-image round width="5rem" height="5rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <p>我是大哥大</p>
        </div>
        <van-divider />
        <!-- 设置 -->
        <van-cell title="我的" icon="manager-o" to="/jssmy" />
        <van-cell title="信息" icon="chat-o" to="/jssinfo" />
        <van-cell title="购物车" icon="cart-o" to="/jsscary" />
        <van-cell title="机器人客服" icon="smile-comment-o" to="/jssservice" />
        <!-- 信息，购物车 -->
      </van-popup>
      <!-- 搜索框 -->
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Popup, Image, Divider, Cell, CellGroup } from "vant";
Vue.use(Image)
  .use(Cell)
  .use(CellGroup)
  .use(Divider);
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
<style lang="less" scoped>
.Tou {
  position: fixed;
  z-index: 100;
  width: 100%;
}

.geren {
  height: 54px;
}

.txt {
  font-size: 12px;
}

.logo {
  text-align: center;
  margin-top: 1rem;
}

.logo p {
  font-size: 12px;
}

.bian {
  border-bottom: 1px solid #ccc;
}

.van-button--primary {
  background: #90d7ec;
  border: 1px solid #90d7ec;
}
.head {
  background-color: #90d7ec;
  padding: 0 20px 0 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
.search {
  flex: 1;
  margin: 0 15px;
  background-color: #fff;
  border-radius: 20px;
  height: 30px;
  position: relative;
  .sear {
    border: none;
    width: 85%;
    height: 100%;
    border-radius: 20px;
    padding-left: 15%;
  }
  i {
    position: absolute;
    left: 15px;
    top: 10px;
  }
}
</style>