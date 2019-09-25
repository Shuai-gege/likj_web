<template>
  <div class="order">
    <navbar :if_left_arrow="true" title="工作台"></navbar>
    <div class="GongzuoTai">
      <!-- 头像 -->
      <van-row class="flex">
        <van-col span="20" offset="1" class="Logo">
          <div class="Logo flex_l">
            <van-image
              round
              width="2.5rem"
              height="2.5rem"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
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
      <van-row class="one solo">
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
import navbar from "@/components/navbar";
export default {
  data() {
    return {};
  },
  components: {
    navbar
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.axios
      .get("/api/user/login", { account: 16638143447, password: "1111" })
      .then(data => {
        console.log(data);
      });
  }
};
</script>
<style lang="less" scoped>
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
  margin: 20px 10px 5px;
  font-size: 15px;
}

.DaiFaHuo {
  color: #8aadd7;
}

.ShouYi {
  color: #ca4131;
}

.icon-sucai,
.icon-shouhuodizhi,
.icon-techreport-,
.icon-shouxufei {
  color: #ef5358;
}

.GongzuoTai {
  margin-top: 28px;
  margin-bottom: 55px;
  background: url("https://s2.ax1x.com/2019/09/21/nxppIf.jpg") no-repeat;
}

.icon-qianbao,
.icon-jiangjinyouhuizhengce,
.icon-daichuli {
  color: #5595ef;
}

.one {
  margin: 10px;
  padding: 10px 15px 15px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 2px 6px 0px rgba(202, 20, 0, 0.1);
  h5 {
    margin-bottom: 15px;
  }
  &.solo {
    font-size: 20px;
  }
}

.team {
  margin: 5px 0;
  color: #dd9e58;
}

.else {
  margin: 5px 0;
  color: #ef5358;
}

.icon-tuandui,
.icon-daili,
.icon-tuijian {
  color: #dd9e58;
}

.wallet {
  color: #5595ef;
  margin: 5px 0;
}

.indent {
  color: #bf5d53;
  margin: 5px 0;
}

.indent span {
  color: #bf5d53;
}

.icon-dingdan,
.icon-gouwuche,
.icon-daifahuo,
.icon-urbantubiao- {
  color: #bf5d53;
}

.authorization {
  color: #868cf9;
  margin: 5px 0;
}

.sqdl {
  border-radius: 40%;
  background: #868cf9;
}

.one p {
  font-size: 12px;
}

.iconfont {
  font-size: 20px;
}

.icon-dinghuo {
  color: #f57968;
}

.icon-woshou {
  color: #868cf9;
}

.icon-shangcheng {
  color: #f4a14f;
}

.icon-1121212 {
  color: #49c54e;
}

.van-col--6 {
  text-align: center;
}

.icon-shenhe,
.icon-shengji,
.icon-zhengshu {
  color: #868cf9;
}
</style>