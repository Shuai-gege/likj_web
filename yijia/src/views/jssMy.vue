<template>
  <div>
    <div class="top">
      <van-icon name="arrow-left" @click="out" />
      <van-icon name="setting" />
      <van-icon name="chat" />
    </div>
    <div class="head">
      <van-uploader :after-read="read" :max-count="1">
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt class="img" />
      </van-uploader>
      <h3>
        <van-button text="登录" @click="login()" style="border: none;background: none;color: #fff;"></van-button>
        {{name}}
      </h3>
    </div>

    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" @click="tap" />待付款
      </van-col>
      <van-col span="6">
        <van-icon name="records" />待发货
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" :info="info" @click="to()" />待收货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />已发货
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="paid" :title="'我的余额: ' + 0 + '元'" />
      <van-cell icon="records" title="历史订单" is-link to="/history" />
    </van-cell-group>

    <van-cell-group class="centers">
      <van-cell icon="points" title="充值中心" is-link @click="pay" />
      <van-cell icon="gold-coin-o" title="我的优惠券" is-link @click="youhui()" />
      <van-cell icon="gift-o" title="我收到的礼物" is-link @click="tap" />
    </van-cell-group>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import { Row, Col, Icon, Cell, CellGroup } from "vant";
Vue.use(CellGroup)
  .use(Row)
  .use(Col)
  .use(Icon)
  .use(Cell);
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      name: "CJQ",
      info: this.$store.state.num,
      huafei: this.$store.state.huafei,
      id: null,
      showLogin: false
    };
  },
  methods: {
    out() {
      this.$router.go(-1);
    },
    login() {
      this.$router.push("/jsslogin");
    }
  }
};
</script>
<style scoped="">
.van-icon-arrow-left:before {
  margin-right: 212px;
}
.top {
  height: 40px;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  background: #fff;
  width: 100%;
}
.user-poster {
  width: 100%;
  height: 53vw;
  display: block;
}
.user-group {
  margin-bottom: 15px;
}
.user-links {
  padding: 15px 0;
  font-size: 12px;
  text-align: center;
  background-color: #fff;
}
.van-icon {
  display: block;
  font-size: 24px;
  line-height: 40px;
  margin-right: 10px;
}
.head {
  height: 230px;
  background: url("https://s2.ax1x.com/2019/09/19/nbDbRO.gif") no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
.head img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.head h3 {
  color: #fff;
}
.van-info {
  right: 30px;
}
.centers {
  margin-bottom: 100px;
}
</style>