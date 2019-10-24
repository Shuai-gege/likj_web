<template>
  <div class="order">
    <navbar title="工作台"></navbar>
    <div class="GongzuoTai">
      <!-- 头像 -->
      <van-row class="flex user" @click="mydata">
        <van-col span="20" offset="1" class="Logo">
          <div class="Logo flex_l">
            <van-image width="2rem" height="2rem" radius="10" :src="initdata.wx_avatar" />
            <p style="line-height:30px;">
              {{initdata.wx_nickname}}
              <br />
              <span style="font-size:12px;">代理等级：{{initdata.agent_name}}</span>
            </p>
          </div>
        </van-col>
        <van-col span="2" class="Logo">
          <p>
            <van-icon name="arrow" />
          </p>
        </van-col>
      </van-row>
      <!-- 每一项 -->
      <van-row class="one solo">
        <van-col span="8" @click="yeji(0)">
          <span class="DaiFaHuo">{{initdata.results}}</span>
          <p>个人业绩</p>
        </van-col>
        <van-col span="8" @click="yeji(1)">
          <span class="ShouYi1">{{initdata.team_results}}</span>
          <p>团队业绩</p>
        </van-col>
        <van-col span="8">
          <span class="ShouYi">{{initdata.profit}}</span>
          <p>累计收益</p>
        </van-col>
      </van-row>
      <!-- 工作台功能 -->
      <van-row class="one">
        <van-col span="6" @click="$router.push('/goodsList')">
          <!-- <i class="iconfont icon-dinghuo"></i> -->
          <img src="../../image/图标/订货2.png" alt />
          <p>我要订货</p>
        </van-col>
        <van-col span="6" @click="$router.push('/agentType')">
          <!-- <i class="iconfont icon-woshou"></i> -->
          <img src="../../image/图标/邀请.png" alt />
          <p>邀请代理</p>
        </van-col>
        <van-col span="6" @click="$router.push('/')">
          <!-- <i class="iconfont icon-shangcheng"></i> -->
          <img src="../../image/图标/品牌商城.png" alt />
          <p>品牌商城</p>
        </van-col>
        <van-col span="6" @click="goList">
          <!-- <i class="iconfont icon-1121212"></i> -->
          <img src="../../image/图标/本地仓.png" alt />
          <p>云仓</p>
        </van-col>
      </van-row>
      <!-- 我的团队 -->
      <van-row class="one">
        <h5 class="team">我的团队</h5>
        <van-col span="8" @click="tap">
          <!-- <i class="iconfont icon-tuandui"></i> -->
          <img style="width:35px;height:35px" src="../../image/图标/我的团队.png" alt />
          <p>团队中心</p>
        </van-col>
        <van-col span="8" @click="team(1)">
          <!-- <i class="iconfont icon-daili"></i> -->
          <img style="width:35px;height:35px" src="../../image/图标/直接代理.png" alt />
          <p>直接代理</p>
        </van-col>
        <van-col span="8" @click="team(2)">
          <!-- <i class="iconfont icon-daili"></i> -->
          <img style="width:35px;height:35px" src="../../image/图标/间接代理.png" alt />
          <p>间接代理</p>
        </van-col>
      </van-row>
      <!-- 授权管理 -->
      <van-row class="one">
        <h5 class="authorization">授权管理</h5>
        <van-col span="8" @click="audit">
          <!-- <i class="iconfont icon-shenhe"></i> -->
          <img src="../../image/图标/授权审核2.png" alt />
          <p>审核授权</p>
        </van-col>
        <van-col span="8" @click="$router.push('/update')">
          <!-- <i class="iconfont icon-shengji"></i> -->
          <img src="../../image/图标/我要升级4.png" alt />
          <p>我要升级</p>
        </van-col>
        <van-col span="8" @click="ccie">
          <!-- <i class="iconfont icon-zhengshu" @click="ccie"></i> -->
          <img src="../../image/图标/品牌授权1.png" alt />
          <p>授权证书</p>
        </van-col>
      </van-row>
      <!-- 财务管理 -->
      <van-row class="one">
        <h5 class="wallet">财务管理</h5>
        <van-col span="8" @click="mypurse">
          <!-- <i class="iconfont icon-qianbao"></i> -->
          <img src="../../image/图标/我的钱包2.png" alt />
          <p>我的钱包</p>
        </van-col>
        <van-col span="8" @click="$router.push('/bonus')">
          <!-- <i class="iconfont icon-jiangjinyouhuizhengce"></i> -->
          <img src="../../image/图标/奖金兑换2.png" alt />
          <p>奖金明细</p>
        </van-col>
        <van-col span="8" @click="$router.push('/shoukuan')">
          <!-- <i class="iconfont icon-daichuli"></i> -->
          <img src="../../image/图标/公司收款账户1.png" alt />
          <p>公司收款账户</p>
        </van-col>
      </van-row>
      <!-- 订单管理 -->
      <van-row class="one">
        <h5 class="indent">订单管理</h5>
        <!-- <van-col span="8" @click="toOrder(1)"> -->
        <!-- <i class="iconfont icon-dingdan"></i> -->
        <!-- <img src="../../image/图标/商场订单.png" alt />
          <p>商城订单</p>
        </van-col>-->
        <van-col span="8" @click="toOrder(2)">
          <!-- <i class="iconfont icon-daifahuo"></i> -->
          <img src="../../image/图标/云仓订单.png" alt />
          <p>云仓订单</p>
        </van-col>
        <van-col span="8" @click="toOrder(3)">
          <!-- <i class="iconfont icon-gouwuche"></i> -->
          <img src="../../image/图标/订单.png" alt />
          <p>提货订单</p>
        </van-col>
        <van-col span="8" @click="$router.push('/xiajidingdan')">
          <img src="../../image/图标/xiaji.png" alt />
          <p>下级订单</p>
        </van-col>
        <van-col span="8" @click="$router.push('/zhuandanorder')">
          <img src="../../image/图标/zhuandan.png" alt />
          <p>我的转单</p>
        </van-col>
        <van-col span="8" @click="shangji" v-if="initdata.up_agent_id != 0">
          <img src="../../image/图标/shangjishoukuan.png" alt />
          <p>上级收款账户</p>
        </van-col>
      </van-row>

      <!-- 其他 -->
      <van-row class="one">
        <h5 class="else">常用工具</h5>
        <van-col span="6">
          <!-- <i class="iconfont icon-sucai"></i> -->
          <img style="width:33px;height:33px;" src="../../image/彩色/gengduo.png" alt />
          <p>素材中心</p>
        </van-col>
        <van-col span="6" @click="address">
          <!-- <i class="iconfont icon-shouhuodizhi"></i> -->
          <img style="width:33px;height:33px;" src="../../image/彩色/ditu.png" alt />
          <p>收货地址</p>
        </van-col>
        <van-col span="6" @click="orderList">
          <!-- <i class="iconfont icon-techreport-"></i> -->
          <img style="width:33px;height:33px;" src="../../image/彩色/fuwusheshixinxichaxun.png" alt />
          <p>商品跟踪</p>
        </van-col>
        <van-col span="6">
          <!-- <i class="iconfont icon-shouxufei"></i> -->
          <img style="width:33px;height:33px;" src="../../image/彩色/shebaojiaofei.png" alt />
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
    return {
      initdata: {},
      type: "" //1直接代理，2间接代理
    };
  },
  components: {
    navbar
  },
  mounted() {
    this.axios.post("/api/user/index").then(data => {
      this.initdata = data;
      localStorage.setItem("agent_id", data.up_agent_id);
    });
  },
  methods: {
    // 订单
    toOrder(i) {
      this.$router.push({
        path: "/orderList",
        query: {
          orderType: i
        }
      });
    },
    // 本地仓库列表，传递type=1
    goList() {
      this.$router.push({
        path: "/stock"
        // query: {
        //   type: 1
        // }
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    mydata() {
      //个人资料
      this.$router.push("/mydata");
    },
    team(type) {
      //我的团队
      this.$router.push({
        path: "/myteam",
        query: {
          type: type
        }
      });
    },
    tap() {
      //团队中心
      this.$router.push({
        path: "/teamcenter"
      });
    },
    mypurse() {
      //我的钱包
      this.$router.push("/mypurse");
    },
    address() {
      //地址
      this.$router.push("/address");
    },
    orderList() {
      //商品跟踪
      this.$router.push("/orderList");
    },
    audit() {
      //授权审核
      this.$router.push({
        path: "/audit",
        query: {
          id: this.id
        }
      });
    },
    ccie() {
      //授权证书
      this.$router.push("/Ccie");
    },

    yeji(tab) {
      this.$router.push({
        path: "/bonus",
        query: {
          tab
        }
      });
    },
    shangji() {
      this.$router.push({
        path: "/shangjishoukuan",
        query: {
          id: localStorage.getItem("agent_id")
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.order {
  padding-top: 44px;
}
.van-image {
  float: left;
  margin-right: 10px;
}

.van-col--12,
.van-col--8 {
  text-align: center;
}

.DaiFaHuo {
  color: #8aadd7;
}

.ShouYi {
  color: #ca4131;
}
.ShouYi1 {
  color: #c18d13;
}

.icon-sucai,
.icon-shouhuodizhi,
.icon-techreport-,
.icon-shouxufei {
  color: #ef5358;
}

.GongzuoTai {
  padding-bottom: 55px;
  background-color: #f5f5f5;
  .user {
    color: #fff;
    // background-image: url(../../image/bgt.png) no-repeat;
    background: url(../../image/bgt2.png) no-repeat center center;
    background-size: 100%;

    .Logo {
      margin: 10px 10px;
      font-size: 16px;
    }
  }
  .one {
    margin: 10px;
    background: #fff;
    border-radius: 10px;
    h5 {
      border-bottom: 1px solid #f5f5f5;
      color: #333;
      padding: 10px;
      font-size: 14px;
      margin: 0;
    }
    i {
      display: block;
      margin-top: 10px;
      font-size: 23px;
    }
    img {
      width: 28px;
      height: 28px;
      margin: 10px auto 4px;
    }
    p {
      color: #666;
      font-size: 12px;
      margin: 3px 0 12px;
    }
    &.solo {
      font-size: 16px;
      padding: 10px 0 0;
    }
  }
}

.icon-qianbao,
.icon-jiangjinyouhuizhengce,
.icon-daichuli {
  color: #5595ef;
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