<template>
  <div class="box">
    <van-nav-bar title="工作台" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-row class="one">
      <van-col span="6">
        <i class="iconfont icon-dinghuo"></i>
        <p>我要订货</p>
      </van-col>
      <van-col span="6">
        <i class="iconfont icon-woshou"></i>
        <p>邀请代理</p>
      </van-col>
      <van-col span="6">
        <i class="iconfont icon-shangcheng"></i>
        <p>亲拍商城</p>
      </van-col>
      <van-col span="6">
        <i class="iconfont icon-1121212"></i>
        <p>本地仓库</p>
      </van-col>
    </van-row>
    <!-- 授权管理 -->
    <van-row class="one">
      <h5 class="authorization">&nbsp;&nbsp;&nbsp;&nbsp;授权管理</h5>
      <van-col span="6">
        <i class="iconfont icon-shenhe"></i>
        <p>审核授权</p>
      </van-col>
      <van-col span="6">
        <i class="iconfont icon-shengji"></i>
        <p>审核升级</p>
      </van-col>
      <van-col span="6">
        <i class="iconfont icon-zhengshu"></i>
        <p>授权证书</p>
      </van-col>
    </van-row>
    <!-- 订单管理 -->
    <van-row class="one">
      <h5 class="indent">&nbsp;&nbsp;&nbsp;&nbsp;订单管理</h5>
      <van-col span="6">
        <i class="iconfont icon-dingdan"></i>
        <p>订单</p>
      </van-col>
      <van-col span="6">
        <i class="iconfont icon-gouwuche"></i>
        <p>购物车</p>
      </van-col>
      <van-col span="6">
        <i class="iconfont icon-daifahuo"></i>
        <p>待发货</p>
      </van-col>
      <van-col span="6">
        <i class="iconfont icon-urbantubiao-"></i>
        <p>待收货</p>
      </van-col>
    </van-row>
    <!-- 财务管理 -->
    <van-row class="one">
      <h5 class="wallet">&nbsp;&nbsp;&nbsp;&nbsp;财务管理</h5>
      <van-col span="6">
        <i class="iconfont icon-qianbao"></i>
        <p>我的钱包</p>
      </van-col>
      <van-col span="6">
        <i class="iconfont icon-jiangjinyouhuizhengce"></i>
        <p>代理奖金兑换</p>
      </van-col>
      <van-col span="6">
        <i class="iconfont icon-daichuli"></i>
        <p>待处理</p>
      </van-col>
    </van-row>
    <!-- 我的团队 -->
    <van-row class="one">
      <h5 class="wallet">&nbsp;&nbsp;&nbsp;&nbsp;我的团队</h5>
      <van-col span="6">
        <i class="iconfont icon-qianbao"></i>
        <p>我的钱包</p>
      </van-col>
      <van-col span="6">
        <i class="iconfont icon-jiangjinyouhuizhengce"></i>
        <p>代理奖金兑换</p>
      </van-col>
      <van-col span="6">
        <i class="iconfont icon-daichuli"></i>
        <p>待处理</p>
      </van-col>
      <van-col span="6">
        <i class="iconfont icon-daichuli"></i>
        <p>待处理</p>
      </van-col>
    </van-row>
    <!-- 其他 -->
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Row, Col, Icon } from "vant";
Vue.use(NavBar)
  .use(Icon)
  .use(Row)
  .use(Col);
export default {
  data() {
    return {};
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="stylus" scoped>
.box p {
  color: #797979;
}

.icon-qianbao, .icon-jiangjinyouhuizhengce, .icon-daichuli {
  color: #5595EF;
}

.one {
  margin: 0 auto;
  margin-top: 10px;
  background: #EDEDED;
  padding-top: 12px;
  border-radius: 20px;
  margin-left: 10px;
  margin-right: 10px;
}

.wallet {
  color: #5595EF;
  margin: 5px 0;
}

.indent {
  color: #BF5D53;
  margin: 5px 0;
}

.indent span {
  color: #BF5D53;
}

.icon-dingdan, .icon-gouwuche, .icon-daifahuo, .icon-urbantubiao- {
  color: #BF5D53;
}

.authorization {
  color: #868CF9;
  margin: 5px 0;
}

.sqdl {
  border-radius: 40%;
  background: #868CF9;
}

.one p {
  font-size: 12px;
}

.iconfont {
  font-size: 1.5625rem;
}

.icon-dinghuo {
  color: #F57968;
}

.icon-woshou {
  color: #868CF9;
}

.icon-shangcheng {
  color: #F4A14F;
}

.icon-1121212 {
  color: #49C54E;
}

.van-col--6 {
  text-align: center;
}

.icon-shenhe, .icon-shengji, .icon-zhengshu {
  color: #868CF9;
}
</style>