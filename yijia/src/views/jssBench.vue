<template>
  <div class="box">
    <van-nav-bar title="工作台" left-text="返回" left-arrow @click-left="onClickLeft" fixed="true" />
    <div class="GongzuoTai">
      <!-- 头像 -->
      <van-row class="flex">
        <van-col span="20" offset="1" class="Logo">
          <div class="Logo flex_l">
            <van-image round width="5rem" height="5rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            <p>
              喵大爷
              <br />全国总代理
            </p>
          </div>
        </van-col>
        <van-col span="2" class="Logo">
          <p>
            <van-icon name="arrow" />
          </p>
        </van-col>
      </van-row>
      <van-row class="one">
        <van-col span="8">
          <span class="DaiFaHuo">0</span>
          <p>代发货订单</p>
        </van-col>
        <van-col span="8">
          <span class="ShouYi">0.00</span>
          <p>本月收益</p>
        </van-col>
        <van-col span="8">
          <span class="ShouYi">2,900.00</span>
          <p>钱包总额</p>
        </van-col>
      </van-row>
      <!-- 工作台功能 -->
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
        <h5 class="team">&nbsp;&nbsp;&nbsp;&nbsp;我的团队</h5>
        <van-col span="6">
          <i class="iconfont icon-tuandui"></i>
          <p>团队中心</p>
        </van-col>
        <van-col span="6">
          <i class="iconfont icon-daili"></i>
          <p>直接代理</p>
        </van-col>
        <van-col span="6">
          <i class="iconfont icon-daili"></i>
          <p>间接代理</p>
        </van-col>
        <van-col span="6">
          <i class="iconfont icon-tuijian"></i>
          <p>推荐代理</p>
        </van-col>
      </van-row>
      <!-- 其他 -->
      <van-row class="one">
        <h5 class="else">&nbsp;&nbsp;&nbsp;&nbsp;我的团队</h5>
        <van-col span="6">
          <i class="iconfont icon-sucai"></i>
          <p>素材中心</p>
        </van-col>
        <van-col span="6">
          <i class="iconfont icon-shouhuodizhi"></i>
          <p>收货地址</p>
        </van-col>
        <van-col span="6">
          <i class="iconfont icon-techreport-"></i>
          <p>商品跟踪</p>
        </van-col>
        <van-col span="6">
          <i class="iconfont icon-shouxufei"></i>
          <p>审核续期</p>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Row, Col, Icon, Image } from "vant";
Vue.use(NavBar)
  .use(Icon)
  .use(Row)
  .use(Col)
  .use(Image);
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

.van-image {
  float: left;
  margin-right: 10px;
}

.van-col--8 {
  text-align: center;
}

.Logo {
  margin-top: 1rem;
}

.DaiFaHuo {
  color: #8AADD7;
}

.ShouYi {
  color: #CA4131;
}

.icon-sucai, .icon-shouhuodizhi, .icon-techreport-, .icon-shouxufei {
  color: #EF5358;
}

.GongzuoTai {
  margin-top: 45px;
  margin-bottom: 55px;
  background: url('https://s2.ax1x.com/2019/09/21/nxppIf.jpg') no-repeat;
}

.icon-qianbao, .icon-jiangjinyouhuizhengce, .icon-daichuli {
  color: #5595EF;
}

.one {
  margin: 10px;
  padding: 10px 15px 15px;
  background: #EDEDED;
  border-radius: 20px;
}

.team {
  margin: 5px 0;
  color: #DD9E58;
}

.else {
  margin: 5px 0;
  color: #EF5358;
}

.icon-tuandui, .icon-daili, .icon-tuijian {
  color: #DD9E58;
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