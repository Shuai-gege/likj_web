<template>
  <div class="my">
    <div class="top">
      <van-icon name="arrow-left" @click="out" style="font-size:20px;color:#333;" class="out" />
      <van-icon name="setting" class="setting" @click="set" />
      <van-icon name="comment-circle" class="comment-circle" @click="message" />
    </div>
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
    <!-- <div class="flex monye">
      <div>
        <p class="flex_c" style="color:#CD5E33;font-size:15px;">{{initdata.margin}}</p>
        <p class="flex_c">保证金</p>
      </div>
      <div>
        <p class="flex_c" style="color:#CD5E33;font-size:15px;">{{initdata.payment_for_goods}}</p>
        <p class="flex_c">货款</p>
      </div>
      <div>
        <p class="flex_c" style="color:#CD5E33;font-size:15px;">{{initdata.bonus}}</p>
        <p class="flex_c">奖金</p>
      </div>
    </div>-->

    <!-- 订单 -->
    <div class="order1 flex">
      <!-- <div @click="toOrder(1)">
        <img src="../../image/图标/shangcheng.png" alt />
        <p>商城订单</p>
      </div>-->
      <div @click="xiajidingdan">
        <img src="../../image/图标/shangcheng.png" alt />
        <p>下级订单</p>
      </div>
      <div @click="toOrder(3)">
        <img src="../../image/图标/tihuo.png" alt />
        <p>提货订单</p>
      </div>
      <div @click="toOrder(2)">
        <img src="../../image/图标/yuncang.png" alt style="width:30px;height:30px;margin-bottom:1px;" />
        <p>云仓订单</p>
      </div>
    </div>
    <div class="content">
      <van-cell-group class="user-group">
        <!-- <van-cell icon="records" title="本月订单总额" is-link to="/history" /> -->
        <van-cell icon="cluster-o" title="云仓记录" is-link to="/yuncangLog" />
        <van-cell icon="manager-o" title="邀请会员" is-link to="/inviteagent" />
      </van-cell-group>

      <van-cell-group class="centers">
        <van-cell icon="points" title="充值中心" is-link to="/topup" />
        <van-cell icon="friends-o" title="我的团队" is-link to="/myteam/?type=0" />
        <van-cell icon="logistics" title="管理收货地址" is-link @click="$router.push('/address')" />
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
      type: "" //跳转奖金传参
    };
  },
  methods: {
    out() {
      this.$router.go(-1);
    },
    login() {
      this.$router.push("/login");
    },
    set() {
      this.$router.push("./set");
    },
    message() {
      this.$router.push("/message");
    },
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
      this.$router.push("/xiajidingdan");
    },
    money(type) {
      this.$router.push({
        path: "/mydetail",
        query: {
          type
        }
      });
    }
  },
  mounted() {
    this.axios.post("/api/user/index").then(data => {
      this.initdata = data;
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
* {
  margin: 0;
}
.van-icon-arrow-left:before {
  margin-right: 212px;
}
.van-icon-setting,
.van-icon-comment-circle {
  margin-right: 10px;
}
.centers {
  margin-bottom: 50px;
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
.top {
  height: 44px;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  background: #fff;
  width: 100%;
  z-index: 1;
}
.order1 {
  padding: 15px 40px;
  img {
    margin: 0 auto;
    width: 25px;
    height: 25px;
    margin-bottom: 6px;
  }
}
.head {
  padding-top: 40px;
  background: #fc4c4c;
}
.my {
  padding-top: 44px;
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