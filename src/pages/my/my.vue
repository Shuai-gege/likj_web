<template>
  <div class="my">
    <!-- <div class="head">
      <p class="flex_c" style="color:white;font-size:30px;">{{initdata.money}}</p>
      <p class="flex_c" style="color:#F2A559;">余额（RMB）</p>
      <div class="flex monye">
        <div @click="money(3)">
          <p class="flex_c">{{initdata.margin}}</p>
          <p class="flex_c txt">保证金</p>
        </div>
        <div @click="money(2)">
          <p class="flex_c">{{initdata.payment_for_goods}}</p>
          <p class="flex_c txt">货款</p>
        </div>
        <div @click="$router.push('/bonus')">
          <p class="flex_c">{{initdata.bonus}}</p>
          <p class="flex_c txt">奖金</p>
        </div>
      </div>
    </div>-->
    <!-- 订单 -->
    <!-- <div class="order1 flex" v-if="initdata.cloud_model!=2">
      <div class="item" @click="xiajidingdan">
        <img src="../../image/图标/shangcheng.png" alt />
        <p>下级订单</p>
        <div class="yuan" v-if="pending.lower_order != 0">{{pending.lower_order}}</div>
      </div>

      <div class="item" @click="toOrder(3)">
        <img src="../../image/图标/tihuo.png" alt />
        <p>提货订单</p>
        <div class="yuan" v-if="pending.pick_order != 0">{{pending.pick_order}}</div>
      </div>

      <div class="item" @click="toOrder(2)">
        <img src="../../image/图标/yuncang.png" alt />
        <p>云仓订单</p>
        <div class="yuan" v-if="pending.yun_order != 0">{{pending.yun_order}}</div>
      </div>
      <div class="item" @click="zhuandan">
        <img src="../../image/图标/zhuandan.png" alt />
        <p>我的转单</p>
      </div>
    </div>-->
    <!-- <div class="content"> -->
    <!-- <van-cell-group>
        <van-cell icon="records" title="本月订单总额" is-link to="/history" />
        <van-cell icon="exchange" title="余额转货款/保证金" is-link @click="zhuan" />
        <van-cell icon="cluster-o" title="云仓记录" is-link to="/yuncangLog" />
        <van-cell
          icon="shop-collect-o"
          v-if="has_shop!=-2"
          :title="has_shop==1?'我的店铺':'申请店铺'"
          is-link
          :to="has_shop==1?'/mystore':'/applystore'"
        />
        <van-cell icon="manager-o" title="邀请会员" is-link to="/inviteagent" />
        <van-cell icon="description" title="授权证书" is-link to="/ccie" />
    </van-cell-group>-->

    <!-- <van-cell-group class="centers">
        <van-cell icon="points" title="充值中心" is-link to="/topup" />
        <van-cell icon="friends-o" title="我的团队" is-link to="/myteam/?type=0" />
        <van-cell icon="logistics" title="管理收货地址" is-link @click="$router.push('/address')" />
        <van-cell icon="setting-o" title="设置支付密码" is-link @click="paypsd(initdata.mobile)" />
        <van-cell icon="user-circle-o" title="修改登录密码" is-link @click="loginpsd(initdata.mobile)" />
        <van-cell
          icon="phone-o"
          :title="initdata.mobile?'修改手机号':'绑定手机号'"
          is-link
          @click="setTel(initdata.mobile,initdata.bind_account)"
        />
        <van-cell icon="chat-o" title="消息中心" is-link to="/message" />
    </van-cell-group>-->
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      initdata: {},
      type: "", //跳转奖金传参
      pending: "", //待处理数量
      num: "", //余额
      has_shop: "" //-2当前等级不可申请；-1会员不可申请；0没店铺；1有店铺；
    };
  },
  methods: {
    // 修改手机号  iscan 是否允许绑定
    setTel(tel, iscan) {
      this.$router.push({
        path: "/set_tel",
        query: {
          type: tel ? 2 : 1,
          iscan: iscan ? 1 : 0
        }
      });
    },
    out() {
      this.$router.go(-1);
    },
    login() {
      this.$router.push("/login");
    },
    // set() {
    //   this.$router.push("./set");
    // },
    // message() {
    //   this.$router.push("/message");
    // },
    // 转单
    zhuandan() {
      this.$router.push({
        path: "/zhuandanorder",
        query: {
          tab: 1
        }
      });
    },
    liwu() {
      this.$toast("开发中");
    },
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
    xiajidingdan() {
      this.$router.push({
        path: "/downorder",
        query: {
          tab: 3
        }
      });
    },
    money(type) {
      this.$router.push({
        path: "/mydetail",
        query: {
          type
        }
      });
    },
    zhuan() {
      this.$router.push({
        path: "/change",
        query: {
          num: this.num
        }
      });
    },
    paypsd(mobile) {
      this.$router.push({
        path: "/payPsd",
        query: {
          mobile
        }
      });
    },
    loginpsd(mobile) {
      this.$router.push({
        path: "/login_psd",
        query: {
          mobile
        }
      });
    }
  },
  mounted() {
    this.axios.post("/api/user/index").then(data => {
      this.initdata = data;
      this.num = data.money;
      this.has_shop = data.has_shop;
    });
    //各种待处理数据
    this.axios.post("/api/outstand_order/outorder").then(data => {
      this.pending = data;
    });
    if (localStorage.getItem("token")) {
      this.zonge;
    } else {
      this.zonge = false;
    }
  }
};
</script>
<style lang="less" scoped>
// .van-icon-arrow-left:before {
//   margin-right: 212px;
// }
// .van-icon-setting,
// .van-icon-comment-circle {
//   margin-right: 10px;
// }

// .out {
//   position: absolute;
//   left: 6px;
//   line-height: 40px;
// }
// .comment-circle {
//   line-height: 40px;
// }
// .setting {
//   line-height: 40px;
// }

// .order1 {
//   padding: 15px 30px;

//   .item {
//     position: relative;
//     .yuan {
//       position: absolute;
//       right: -4px;
//       top: -5px;
//     }
//   }
//   img {
//     margin: 0 auto;
//     width: 25px;
//     height: 25px;
//     margin-bottom: 6px;
//   }
// }
// .head {
//   padding-top: 40px;
//   background: #182128;
// }
// .my {
// padding-top: 44px;
//   padding-bottom: 60px;
//   min-height: 100vh;
// }
// .monye {
//   padding: 10px 40px;
//   color: white;
//   margin-top: 10px;
//   font-size: 14px;
//   .txt {
//     color: #fdc083;
//     font-size: 12px;
//   }
// }
// .user-poster {
//   width: 100%;
//   height: 53vw;
//   display: block;
// }

// .user-links {
//   padding: 15px 0;
//   font-size: 12px;
//   text-align: center;
//   background-color: #fff;
// }
// .van-icon {
//   display: block;
//   font-size: 24px;
// }
// .van-info {
//   right: 30px;
// }

// .van-icon-records:before {
//   color: #f6cc9e;
//   margin-top: 4px;
// }
// .van-icon-points:before {
//   color: #008b00;
//   margin-top: 4px;
// }
// .van-icon-friends-o:before {
//   color: #24acf2;
//   margin-top: 4px;
// }
// .van-icon-gift-o:before {
//   color: goldenrod;
//   margin-top: 4px;
// }

// .van-icon-cash-on-deliver:before {
//   color: #2b9fd8;
//   margin-top: 4px;
// }
// .van-icon-logistics:before {
//   color: #f86829;
//   margin-top: 4px;
// }
// .van-icon-cluster-o:before {
//   color: #f86829;
//   margin-top: 4px;
// }
// .van-icon-manager-o:before {
//   color: #c1b513;
//   margin-top: 4px;
// }
// .van-icon-setting-o:before {
//   color: #3648ee;
//   margin-top: 4px;
// }
// .van-icon-user-circle-o:before {
//   color: #ffea2d;
//   margin-top: 4px;
// }
// .van-icon-phone-o:before {
//   color: #36eea1;
//   margin-top: 4px;
// }
// .van-icon-chat-o:before {
//   color: #b759f5;
//   margin-top: 4px;
// }
// .van-icon-description:before {
//   color: #b759f5;
//   margin-top: 4px;
// }
// .van-icon-exchange:before {
//   color: #80b3ff;
//   margin-top: 4px;
// }
// .van-icon-shop-collect-o:before {
//   color: #04d1b6;
//   margin-top: 4px;
// }

// .van-cell {
//   font-size: 0.75rem;
// }
// .van-button--large {
//   padding-right: 20px;
// }

// span {
//   margin-left: 0.625rem;
//   font-size: 14px;
//   line-height: 30px;
// }
// .van-icon-arrow {
//   font-size: 16px;
//   margin-top: 6px;
// }
// .btn {
//   background: rgba(255, 255, 255, 0);
// }
</style>