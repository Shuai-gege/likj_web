<template>
  <div class="box">
    <div>
      <van-row class="Tou">
        <van-col span="3">
          <van-button type="primary" @click="showPopup" icon="bars" class="geren"></van-button>
        </van-col>
        <van-col span="21">
          <form action="/" class="SouSuo">
            <van-search
              v-model="value"
              placeholder="请输入搜索关键词"
              show-action
              background="#90d7ec"
              shape="round"
            />
          </form>
        </van-col>
      </van-row>
      <!-- 遮罩层 -->
      <van-popup v-model="show" position="top" :style="{ height: '100%' ,width:'50%'}">
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
<style lang="stylus" scoped>
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
</style>