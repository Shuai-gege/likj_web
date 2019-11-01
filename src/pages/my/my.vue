<template>
  <div class="my">
    <!-- <div class="top">
      <van-icon name="arrow-left" @click="out" style="font-size:20px;color:#333;" class="out" />
      <van-icon name="setting" class="setting" @click="set" />
      <van-icon name="comment-circle" class="comment-circle" @click="message" />
    </div>-->
    <div class="head">
      <p class="flex_c" style="color:white;font-size:30px;">{{initdata.money}}</p>
      <p class="flex_c" style="color:#F2A559;">余额（RMB）</p>
      <div class="flex monye">
        <div @click="money(4)">
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
    </div>
    <!-- 订单 -->
    <div class="order1 flex">
      <div @click="xiajidingdan">
        <img src="../../image/图标/shangcheng.png" alt />
        <p>下级订单</p>
        <div
          style="position: absolute;left:66px;top:10px;"
          class="yuan"
          v-if="pending.lower_order != 0"
        >{{pending.lower_order}}</div>
      </div>

      <div @click="toOrder(3)">
        <img src="../../image/图标/tihuo.png" alt />
        <p>提货订单</p>
        <div
          style="position: absolute;left:192px;top:10px;"
          class="yuan"
          v-if="pending.pick_order != 0"
        >{{pending.pick_order}}</div>
      </div>

      <div @click="toOrder(2)">
        <img src="../../image/图标/yuncang.png" alt style="width:30px;height:30px;margin-bottom:1px;" />
        <p>云仓订单</p>
        <div
          style="position: absolute;right:40px;top:10px;"
          class="yuan"
          v-if="pending.yun_order != 0"
        >{{pending.yun_order}}</div>
      </div>
    </div>
    <div class="content">
      <van-cell-group class="user-group">
        <!-- <van-cell icon="records" title="本月订单总额" is-link to="/history" /> -->
        <van-cell icon="exchange" title="余额转货款" is-link @click="zhuan" />
        <van-cell icon="cluster-o" title="云仓记录" is-link to="/yuncangLog" />
        <van-cell icon="manager-o" title="邀请会员" is-link to="/inviteagent" />
        <van-cell icon="description" title="授权证书" is-link to="/ccie" />
      </van-cell-group>

      <van-cell-group class="centers">
        <van-cell icon="points" title="充值中心" is-link to="/topup" />
        <van-cell icon="friends-o" title="我的团队" is-link to="/myteam/?type=0" />
        <van-cell icon="logistics" title="管理收货地址" is-link @click="$router.push('/address')" />
        <van-cell icon="setting-o" title="设置" is-link to="/set" />
        <van-cell icon="chat-o" title="消息中心" is-link to="/message" />
      </van-cell-group>
    </div>
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
      num: "" //余额
    };
  },
  methods: {
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
    liwu() {
      this.$toast("开发中");
    },
    // 订单
    toOrder(type) {
      this.$router.push({
        path: "/orderList",
        query: {
          orderType: type
        }
      });
    },
    xiajidingdan() {
      this.$router.push("/downorder");
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
    }
  },
  mounted() {
    this.axios.post("/api/user/index").then(data => {
      this.initdata = data;
      this.num = data.money;
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
// .top {
//   height: 44px;
//   display: flex;
//   justify-content: flex-end;
//   position: fixed;
//   top: 0;
//   background: #fff;
//   width: 100%;
//   z-index: 1;
// }
.van-icon-arrow-left:before {
  margin-right: 212px;
}
.van-icon-setting,
.van-icon-comment-circle {
  margin-right: 10px;
}

.out {
  position: absolute;
  left: 6px;
  line-height: 40px;
}
.comment-circle {
  line-height: 40px;
}
.setting {
  line-height: 40px;
}

.order1 {
  padding: 15px 40px;
  position: relative;
  img {
    margin: 0 auto;
    width: 25px;
    height: 25px;
    margin-bottom: 6px;
  }
}
.head {
  padding-top: 40px;
  background: #182128;
}
.my {
  // padding-top: 44px;
  padding-bottom: 60px;
  min-height: 100vh;
}
.monye {
  padding: 10px 40px;
  color: white;
  margin-top: 10px;
  font-size: 14px;
  .txt {
    color: #fdc083;
    font-size: 12px;
  }
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
}
.van-info {
  right: 30px;
}

.van-icon-records:before {
  color: #f6cc9e;
  margin-top: 4px;
}
.van-icon-points:before {
  color: #008b00;
  margin-top: 4px;
}
.van-icon-friends-o:before {
  color: #24acf2;
  margin-top: 4px;
}
.van-icon-gift-o:before {
  color: goldenrod;
  margin-top: 4px;
}

.van-icon-cash-on-deliver:before {
  color: #2b9fd8;
  margin-top: 4px;
}
.van-icon-logistics:before {
  color: #f86829;
  margin-top: 4px;
}
.van-icon-cluster-o:before {
  color: #f86829;
  margin-top: 4px;
}
.van-icon-manager-o:before {
  color: #c18d13;
  margin-top: 4px;
}
.van-icon-setting-o:before {
  color: #3648ee;
  margin-top: 4px;
}
.van-icon-chat-o:before {
  color: #b759f5;
  margin-top: 4px;
}
.van-icon-description:before {
  color: #b759f5;
  margin-top: 4px;
}
.van-icon-exchange:before {
  color: #80b3ff;
  margin-top: 4px;
}
.van-cell {
  font-size: 0.75rem;
}
.van-button--large {
  padding-right: 20px;
}
span {
  margin-left: 0.625rem;
  font-size: 14px;
  line-height: 30px;
}
.van-icon-arrow {
  font-size: 16px;
  margin-top: 6px;
}
.btn {
  background: rgba(255, 255, 255, 0);
}
</style>