<template>
  <div class="worker">
    <!-- 头像 -->
    <van-row class="flex user" @click="mydata">
      <van-col span="20" offset="1" class="Logo">
        <div class="Logo flex_l">
          <van-image width="2rem" height="2rem" radius="10" fit="cover" :src="initdata.wx_avatar" />
          <div class="userimage">
            <p class="flex_l">
              {{ initdata.wx_nickname }}
              <!-- <span class="yuan" v-if="num != 0" style="margin-left:5px;">
                {{
                num
                }}
              </span>-->
            </p>
            <br />
            <span style="font-size:12px;">代理等级：{{ initdata.agent_name }}</span>
          </div>
        </div>
      </van-col>
      <van-col span="2" class="Logo">
        <p>
          <van-icon name="arrow" />
        </p>
      </van-col>
    </van-row>
    <div class="money">
      <div class="tixian flex">
        <div class="bouns" @click="$router.push('/bonus')">
          余额
          <i>￥{{initdata.money}}</i>
        </div>
        <div class="go" @click="$router.push('/tixian')">立即提现</div>
      </div>
      <div class="jiangjin flex">
        <div>
          <p class="qian">￥{{ initdata.results }}</p>
          <p>个人业绩</p>
        </div>
        <div>
          <p class="qian">￥{{ initdata.team_results }}</p>
          <p>团队业绩</p>
        </div>
        <div>
          <p class="qian">￥{{ initdata.profit }}</p>
          <p>累计收益</p>
        </div>
      </div>
    </div>
    <!-- 非云仓模式 -->
    <div class="no_yuncang">
      <van-row class="one">
        <van-col span="6" @click="$router.push('/agentType')">
          <img src="../../image/工作台/邀请.png" alt />
          <p>邀请代理</p>
        </van-col>
        <van-col span="6" @click="mypurse">
          <img src="../../image/工作台/账户总额.png" alt />
          <p>我的钱包</p>
        </van-col>

        <van-col span="6" @click="$router.push('/update')">
          <img src="../../image/工作台/升级.png" alt />
          <p>我要升级</p>
        </van-col>
        <van-col span="6">
          <img src="../../image/工作台/tuanduizhuangong.png" alt @click="$router.push('/myteam')" />
          <p>我的团队</p>
        </van-col>
      </van-row>
      <div class="items flex_l">
        <div class="item flex" @click="goList" v-if="initdata.cloud_model!=2">
          <img src="../../image/黄黑/yuncang.png" alt />
          <p>云仓</p>
        </div>
        <div class="item flex" @click="toOrder(2)" v-if="initdata.cloud_model!=2">
          <div class="yuan" v-if="pending.yun_order">{{pending.yun_order}}</div>
          <img src="../../image/黄黑/仓库1.png" alt />
          <p>云仓订单</p>
        </div>
        <div class="item flex" @click="toOrder(3)" v-if="initdata.cloud_model!=2">
          <div class="yuan" v-if="pending.pick_order">{{pending.pick_order}}</div>
          <img src="../../image/黄黑/订单.png" alt />
          <p>提货订单</p>
        </div>
        <div class="item flex" @click="tap">
          <img src="../../image/黄黑/zhongxin.png" alt />
          <p>团队中心</p>
        </div>
        <div class="item flex" @click="toOrder(1)" v-if="initdata.cloud_model==2">
          <img src="../../image/黄黑/仓库2.png" alt />
          <p>我的订单</p>
        </div>
        <div class="item flex" @click="zhuandan" v-if="initdata.take_type!=2">
          <img src="../../image/黄黑/zhuandan.png" alt />
          <p>我的转单</p>
        </div>
        <div class="item flex" @click="yuncangjilu" v-if="initdata.cloud_model!=2">
          <img src="../../image/黄黑/订单 (2).png" alt />
          <p>云仓记录</p>
        </div>
        <div class="item flex" @click="audit" v-if="initdata.check_type!=2">
          <div class="yuan" v-if="pending.audit_agent">{{pending.audit_agent}}</div>
          <img src="../../image/黄黑/官方.png" alt />
          <p>审核授权</p>
        </div>
        <div class="item flex" @click="huiyuan">
          <img src="../../image/黄黑/yaoqing.png" alt />
          <p>邀请会员</p>
        </div>
        <div class="item flex" @click="zhuan">
          <img src="../../image/黄黑/转换.png" alt />
          <p>转货款保证金</p>
        </div>
        <div
          class="item flex"
          @click="$router.push('/topuplist')"
          v-if="initdata.cash_rechage_type!=2"
        >
          <div class="yuan" v-if="pending.recharge">{{pending.recharge}}</div>
          <img src="../../image/黄黑/充值.png" alt />
          <p>下级充值</p>
        </div>
        <div
          class="item flex"
          @click="$router.push('/xiajitixianlist')"
          v-if="initdata.cash_rechage_type!=2"
        >
          <div class="yuan" v-if="pending.cash">{{pending.cash}}</div>
          <img src="../../image/黄黑/费用单据.png" alt />
          <p>下级提现</p>
        </div>
        <div class="item flex" @click="xiajidingdan" v-if="initdata.take_type!=2">
          <div class="yuan" v-if="pending.lower_order">{{pending.lower_order}}</div>
          <img src="../../image/黄黑/订单 (1).png" alt />
          <p>下级订单</p>
        </div>

        <div class="item flex" @click="shangji">
          <img src="../../image/黄黑/账户2.png" alt />
          <p>上级账户</p>
        </div>
        <!-- <div class="item flex" @click="$router.push('/bonus')">
          <img src="../../image/工作台/yusuanfenxi.png" alt />
          <p>奖金明细</p>
        </div>-->
        <div class="item flex" @click="$router.push('/shoukuan')">
          <img src="../../image/黄黑/账户信息.png" alt />
          <p>公司账户</p>
        </div>
        <div class="item flex" @click="$router.push('/myaccount')">
          <img src="../../image/黄黑/账户信息 (1).png" alt />
          <p>我的账户</p>
        </div>
        <div class="item flex" @click="$router.push('/material')">
          <img src="../../image/黄黑/gengduo.png" alt />
          <p>素材中心</p>
        </div>

        <div class="item flex" @click="$router.push('/area_agent')">
          <img src="../../image/黄黑/定位.png" alt />
          <p>区域代理</p>
        </div>

        <div class="item flex" @click="xiaoxi">
          <img src="../../image/黄黑/xiaoxi.png" alt />
          <p>消息中心</p>
        </div>
        <div class="item flex" @click="zhengshu">
          <img src="../../image/黄黑/认证.png" alt />
          <p>授权证书</p>
        </div>
        <div class="item flex" @click="$router.push('/fake')">
          <img src="../../image/黄黑/fake.png" alt />
          <p>防伪查询</p>
        </div>
        <div class="item flex" @click="$router.push('/set')">
          <img src="../../image/黄黑/shezhi.png" alt />
          <p>设置</p>
        </div>
      </div>
    </div>
    <!-- 云仓模式 v-else-->
    <!-- <div class="yuncang_model" v-if="initdata&&initdata.cloud_model!=2">
      <van-row class="one">
        <van-col span="6" @click="$router.push('/agentType')">
          <img src="../../image/图标/邀请.png" alt />
          <p>邀请代理</p>
        </van-col>
        <van-col span="6" @click="audit">
          <img src="../../image/图标/订货2.png" alt />
          <p>审核授权</p>
        </van-col>
        <span
          style="position: absolute;left:39%"
          class="yuan"
          v-if="pending.audit_agent != 0"
        >{{ pending.audit_agent }}</span>
        <van-col span="6" @click="$router.push('/update')">
          <img src="../../image/图标/woyaoshengji.png" alt />
          <p>我要升级</p>
        </van-col>
        <van-col span="6" @click="goList">
          <img src="../../image/图标/本地仓.png" alt />
          <p>云仓</p>
        </van-col>
    </van-row>-->
    <!-- 订单管理 -->
    <!-- <van-row class="one">
          <h5 class="indent">订单管理</h5>
          <van-col span="6" @click="toOrder(2)">
            <img src="../../image/图标/云仓订单.png" alt />
            <p>云仓订单</p>
            <span
              style="position: absolute;left:50px;top:3px;"
              class="yuan"
              v-if="pending.yun_order != 0"
            >{{pending.yun_order}}</span>
          </van-col>
          <van-col span="6" @click="toOrder(3)">
            <img src="../../image/图标/订单.png" alt />
            <p>提货订单</p>
            <span
              style="position: absolute;left:50px;top:3px;z-index:1;"
              class="yuan"
              v-if="pending.pick_order != 0"
            >{{pending.pick_order}}</span>
          </van-col>
          <van-col span="6" @click="xiajidingdan">
            <img src="../../image/图标/xiaji.png" alt />
            <p>下级订单</p>
            <span
              style="position: absolute;left:50px;top:3px;"
              class="yuan"
              v-if="pending.lower_order != 0"
            >{{pending.lower_order}}</span>
          </van-col>
          <van-col span="6" @click="zhuandan">
            <img src="../../image/图标/zhuandan.png" alt />
            <p>我的转单</p>
          </van-col>
    </van-row>-->
    <!-- 充值管理 -->
    <!-- <van-row class="one chongzhi">
        <h5 class="wallet">充值管理</h5>
        <van-col span="6" @click="$router.push('/topup')">
          <img src="../../image/图标/chongzhi.png" alt />
          <p>充值</p>
        </van-col>
        <van-col span="6" @click="$router.push('/tixian')">
          <img src="../../image/图标/tixian.png" alt />
          <p>提现</p>
        </van-col>
        <van-col span="6" @click="$router.push('/topuplist')">
          <img src="../../image/图标/xiajichongzhi.png" alt />
          <p>下级充值</p>
          <div
            style="position: absolute;left:60%;top:3%;"
            class="yuan"
            v-if="pending.recharge != 0"
          >{{ pending.recharge }}</div>
        </van-col>
        <van-col span="6" @click="$router.push('/xiajitixianlist')">
          <img src="../../image/图标/xiajitixian.png" alt />
          <p>下级提现</p>
          <span
            style="position: absolute;left:60%;top:3%;"
            class="yuan"
            v-if="pending.cash != 0"
          >{{ pending.cash }}</span>
        </van-col>
    </van-row>-->
    <!-- 我的团队 -->
    <!-- <van-row class="one">
        <h5 class="team">我的团队</h5>
        <van-col span="8" @click="tap">
          <img style="width:32px;height:30px;margin-top:12px" src="../../image/图标/我的团队.png" alt />
          <p>团队中心</p>
        </van-col>
        <van-col span="8" @click="team(1)">
          <img style="width:32px;height:30px;margin-top:12px" src="../../image/图标/直接代理.png" alt />
          <p>我的团队</p>
        </van-col>
        <van-col span="8" @click="shangji" v-if="initdata.up_agent_id != 0">
          <img
            style="width:32px;height:35px;margin-top:7px"
            src="../../image/图标/shangjishoukuan.png"
            alt
          />
          <p>上级收款账户</p>
        </van-col>
    </van-row>-->

    <!-- 财务管理 -->
    <!-- <van-row class="one">
        <h5 class="wallet">财务管理</h5>
        <van-col span="6" @click="mypurse">
          <img src="../../image/图标/我的钱包2.png" alt />
          <p>我的钱包</p>
        </van-col>
        <van-col span="6" @click="$router.push('/bonus')">
          <img src="../../image/图标/奖金兑换2.png" alt />
          <p>奖金明细</p>
        </van-col>
        <van-col span="6" @click="$router.push('/shoukuan')">
          <img src="../../image/图标/公司收款账户1.png" alt />
          <p>公司收款账户</p>
        </van-col>
        <van-col span="6" @click="$router.push('/myaccount')">
          <img src="../../image/图标/收款.png" alt />
          <p>我的收款账户</p>
        </van-col>
    </van-row>-->

    <!-- 其他 -->
    <!-- <van-row class="one">
        <h5 class="else">常用工具</h5>
        <van-col span="6" @click="$router.push('/material')">
    <van-col span="6" @click="$router.push('/sucaiconter')">-->
    <!-- <img style="width:33px;height:33px;" src="../../image/彩色/gengduo.png" alt />
          <p>素材中心</p>
    </van-col>-->
    <!-- <van-col span="6" @click="orderList">
          <img style="width:33px;height:33px;" src="../../image/彩色/fuwusheshixinxichaxun.png" alt />
          <p>商品跟踪</p>
    </van-col>-->
    <!-- <van-col span="6" @click="$router.push('/school')">
          <img style="width:33px;height:33px;" src="../../image/彩色/shebaojiaofei.png" alt />
          <p>商学院</p>
        </van-col>
        <van-col span="6" @click="$router.push('/fake')">
          <img style="width:33px;height:33px;" src="../../image/彩色/fake.png" alt />
          <p>防伪查询</p>
        </van-col>
        <van-col span="6" @click="$router.push('/area_agent')" v-if="initdata.agent_area==1">
          <img style="width:33px;height:33px;" src="../../image/彩色/定位.png" alt />
          <p>区域代理</p>
    </van-col>-->
    <!-- </van-row> -->
    <!-- </div> -->
  </div>
</template>
<script>
import navbar from "@/components/navbar";
export default {
  data() {
    return {
      initdata: {},
      type: "", //1直接代理，2间接代理
      pending: {}, //各种待处理信息
      num: "", //全部待处理信息数量
      num1: "" //余额
    };
  },
  components: {
    navbar
  },
  mounted() {
    this.axios.post("/api/user/index").then(data => {
      this.initdata = data;
      this.num1 = data.money;
      localStorage.setItem("agent_id", data.up_agent_id);
    });
    //各种待处理数据
    this.axios.post("/api/outstand_order/outorder").then(data => {
      this.pending = data;
      this.num =
        data.audit_agent +
        data.lower_order +
        data.yun_order +
        data.pick_order +
        data.recharge +
        data.cash;
    });
  },
  methods: {
    // 订单
    toOrder(i) {
      this.$router.push({
        path: "/orderList",
        query: {
          orderType: i,
          tab: i
        }
      });
    },
    // 下级订单
    xiajidingdan() {
      this.$router.push({
        path: "/downorder",
        query: {
          tab: 3
        }
      });
    },
    // 转单
    zhuandan() {
      this.$router.push({
        path: "/zhuandanorder",
        query: {
          tab: 1
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

    shangji() {
      this.$router.push({
        path: "/shangjishoukuan",
        query: {
          id: localStorage.getItem("agent_id")
        }
      });
    },
    // 下级订单
    xiajidingdan() {
      this.$router.push({
        path: "/downorder",
        query: {
          tab: 3
        }
      });
    },
    // 云仓订单
    // 订单
    toOrder(type) {
      let tab;
      if (type == 2) {
        tab = 2;
      } else {
        tab = 3;
      }
      this.$router.push({
        path: "/orderList",
        query: {
          orderType: type,
          tab: tab
        }
      });
    },
    // 转单
    zhuandan() {
      this.$router.push({
        path: "/zhuandanorder",
        query: {
          tab: 1
        }
      });
    },
    // 余额转保证及，货款
    zhuan() {
      this.$router.push({
        path: "/change",
        query: {
          num: this.num1
        }
      });
    },
    // 设置支付密码
    paypsd(mobile) {
      this.$router.push({
        path: "/payPsd",
        query: {
          mobile
        }
      });
    },
    // 修改登录密码
    loginpsd(mobile) {
      this.$router.push({
        path: "/login_psd",
        query: {
          mobile
        }
      });
    },
    // 修改手机号
    setTel(tel, iscan) {
      this.$router.push({
        path: "/set_tel",
        query: {
          type: tel ? 2 : 1,
          iscan: iscan ? 1 : 0
        }
      });
    },
    // 云仓记录
    yuncangjilu() {
      this.$router.push("/yuncangLog");
    },
    // 邀请会员
    huiyuan() {
      this.$router.push("/inviteagent");
    },
    //授权证书
    zhengshu() {
      this.$router.push("/ccie");
    },
    // 消息中心
    xiaoxi() {
      this.$router.push("/message");
    }
  }
};
</script>
<style lang="less" scoped>
.worker {
  background: #f5f6f7;
  padding-bottom: 55px;
  i {
    color: #fff;
  }
  .van-col--6 {
    position: relative;
  }
  .user {
    color: #fff;
    background: linear-gradient(to right, #801336, #c72c41);
    background-size: 100%;
    height: 140px;
    .Logo {
      margin: 10px 10px;
      font-size: 16px;
    }
    .userimage {
      line-height: 20px;
      margin-left: 10px;
    }
  }
  .one {
    margin: 10px;
    background: #fff;
    border-radius: 10px;

    &.chongzhi {
      img {
        width: 48px;
        height: 48px;
        margin: 2px auto -10px;
      }
    }
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
      width: 30px;
      height: 30px;
      margin: 10px auto 4px;
    }
    p {
      color: #666;
      font-size: 12px;
      margin: 3px 0 12px;
      font-weight: 700;
    }
    &.solo {
      font-size: 16px;
      padding: 10px 0 0;
    }
    .van-col {
      text-align: center;
    }
  }
  // 头部
  .money {
    padding: 0 10px;
    position: relative;
    top: -15px;
    .tixian {
      background: #3c3c3b;
      padding: 10px 20px;
      border-radius: 10px 10px 0 0;
      .bouns {
        font-size: 16px;
        color: #ffefc6;
        i {
          color: #ffefc6;
        }
      }
      p:nth-child(1) {
        color: #ffffdc;
        font-size: 18px;
      }
      p:nth-child(2) {
        color: #848484;
        font-size: 10px;
      }
    }
    .go {
      font-size: 12px;
      color: #9f7045;
      background: #ffefc6;
      padding: 0px 10px;
      border-radius: 20px;
    }
    .jiangjin {
      background: #fff;
      padding: 10px 20px;
      border-radius: 0 0 10px 10px;
      p {
        text-align: center;
      }
      p:nth-child(odd) {
        font-size: 13px;
        color: #000;
        font-weight: 700;
      }
    }
  }
  .no_yuncang {
    position: relative;
    top: -10px;
    .items {
      background-color: #fff;
      margin: 12px 10px;
      border-radius: 5px;
      flex-wrap: wrap;
      .item {
        width: 25%;
        flex-direction: column;
        height: 80px;
        padding: 15px 0;
        font-size: 12px;
        // border-right: 1px solid #f5f6f7;
        // border-bottom: 1px solid #f5f6f7;
        position: relative;
        .yuan {
          position: absolute;
          right: 18px;
          top: 6px;
        }
        &:nth-of-type(4n) {
          border-right: none;
        }

        img {
          width: 25px;
          height: 25px;
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
