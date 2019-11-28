<template>
  <div class="newmy">
    <!-- 头部公共搜索框 -->
    <div class="con">
      <!-- 头部 -->
      <div class="top flex_l">
        <img src="../../image/bgt2.png" alt />
        <div class="name">
          <p>
            代理昵称
            <i>金牌代理</i>
          </p>
          <p>邀请码：0000</p>
        </div>
      </div>
      <!-- 奖金 -->
      <div class="money">
        <div class="tixian flex">
          <div>
            <p>
              奖金
              <i>￥10000</i>
            </p>
            <p>每月月初结算上月</p>
          </div>
          <div class="go">
            立即提现
            <van-icon name="arrow" />
          </div>
        </div>
        <!-- 分割 -->
        <div class="jiangjin flex">
          <div>
            <p class="qian">￥17</p>
            <p>今日预估</p>
          </div>
          <div>
            <p class="qian">￥17.8</p>
            <p>本月预估</p>
          </div>
          <div>
            <p class="qian">￥332.8</p>
            <p>上月预估</p>
          </div>
        </div>
      </div>
      <!-- 订单管理 -->
      <div class="order">
        <div class="manage flex">
          <p>订单管理</p>
          <span>全部订单</span>
        </div>
        <div class="order_item flex">
          <div>
            <van-icon name="paid" size="25" />
            <p>代付款</p>
          </div>
          <div>
            <van-icon name="send-gift-o" size="25" />
            <p>代发货</p>
          </div>
          <div>
            <van-icon name="shopping-cart-o" size="25" />
            <p>代收货</p>
          </div>
          <div>
            <van-icon name="chat-o" size="25" />
            <p>已收货</p>
          </div>
        </div>
      </div>
      <!-- 功能 -->
      <div class="function flex_w">
        <div class="item" v-for="(item,i) in 5" :key="i" align="center">
          <img src="../../image/彩色/钱包.png" alt />
          <p>我的钱包</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },

  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.newmy {
  font-size: 14px;
  min-height: 100vh;
  background: #f5f5f5;
  .con {
    .top {
      height: 140px;
      background: #ffe0a4;
      padding: 0 15px;
      padding-bottom: 30px;
      img {
        width: 65px;
        height: 65px;
        border-radius: 50%;
      }
      .name {
        margin-left: 10px;
        color: #333;
        font-weight: 700;
        i {
          background: #333;
          color: #fff;
          padding: 0 15px;
          font-size: 12px;
          border-radius: 20px;
          font-weight: 400;
          margin-left: 80px;
        }
        p:nth-child(1) {
          margin-bottom: 10px;
        }
      }
    }
    .money {
      padding: 0 10px;
      position: relative;
      top: -30px;
      .tixian {
        background: #3c3c3b;
        padding: 10px 20px;
        border-radius: 10px 10px 0 0;
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
        padding: 3px 10px;
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
          color: #333;
          font-weight: 700;
        }
      }
    }
    .order {
      padding: 0 10px;
      margin-top: -20px;
      .manage {
        background: #fff;
        padding: 10px 15px;
        border-radius: 10px 10px 0 0;
        border-bottom: 1px solid #f5f5f5;
        p {
          font-size: 15px;
          color: #333;
          font-weight: 700;
        }
        span {
          font-size: 12px;
          color: #999;
        }
      }
      .order_item {
        padding: 20px 15px 10px;
        background: #fff;
        border-radius: 0 0 10px 10px;
        .van-icon {
          margin-left: 10px;
          color: #d6c4a4;
        }
      }
    }
    .function {
      padding: 10px;
      margin: 0 auto;
      .item {
        width: 33%;
        height: 100px;
        background: #fff;
        border-right: 1px solid #f5f5f5;
        border-bottom: 1px solid #f5f5f5;

        img {
          width: 30px;
          height: 30px;
          display: inline-block;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
