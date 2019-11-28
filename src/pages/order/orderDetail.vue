<template>
  <div class="orderDetail">
    <tabbar title="订单详情" @back="goback" back="1"></tabbar>
    <div class="detail" v-if="initdata.goods_list&&initdata.goods_list.length>0">
      <div class="address" v-if="order_type!=2">
        <van-cell :title="initdata.consignee" icon="location-o" :value="initdata.receiving_tel" />
        <van-cell :value="'地址：'+initdata.address+' '+initdata.address_details" class="solo" />
      </div>
      <div class="con">
        <div class="top flex_l" v-for="(item,i) in initdata.goods_list" :key="i">
          <van-image width="2.5rem" height="2.5rem" fit="cover" radius="5" :src="item.cover_Image" />
          <div class="pro">
            <div class="name erhang">{{item.name}}</div>
            <div class="price flex">
              <span>
                <i>￥</i>
                {{item.price}}
              </span>
              <span style="color:#666;">{{item.unit_info.str}}</span>
            </div>
            <div class="size">{{item.space_name}}</div>
          </div>
        </div>
        <div class="item">
          <van-cell v-if="order_type!=2" title="运费" :value="'￥'+initdata.freight_money" />
          <van-cell title="订单总价" :value="'￥'+initdata.goods_money" />
          <van-cell
            class="price"
            v-if="order_type==3&&order_status==0"
            title="实付金额"
            :value="'￥'+initdata.freight_money"
          />
          <van-cell class="price" v-else title="实付金额" :value="'￥'+initdata.order_money" />
        </div>
      </div>
      <div class="con">
        <div class="item">
          <van-cell title="订单编号" :value="initdata.order_number" />
          <van-cell title="下单时间" :value="initdata.createtime" />

          <!-- 除了 已取消 待付款 -->
          <div v-if="order_status>0">
            <van-cell title="支付方式" :value="payType" />
            <!-- <van-cell title="交易单号" :value="initdata.transaction_no" /> -->
            <van-cell title="付款时间" :value="initdata.pay_time" />
          </div>

          <van-cell v-if="order_status==-1" title="取消时间" :value="initdata.cancel_time" />
          <van-cell v-if="order_status>1" title="发货时间" :value="initdata.delivery_time" />
          <van-cell v-if="order_status==4" title="退款时间" :value="initdata.apply_return_time" />
          <van-cell v-if="order_status==5" title="退款时间" :value="initdata.confirm_return_time" />
        </div>
      </div>
      <div class="foot flex" v-if="order_status==0||order_status==2">
        <!-- 已取消 -->
        <van-button v-if="order_status==-1" size="small" type="default">订单已取消</van-button>
        <!-- 代付款 -->
        <van-button v-if="order_status==0" size="small" type="default" @click="cancel">取消订单</van-button>
        <van-button v-if="order_status==0" size="small" type="danger" @click="gopay">立即付款</van-button>
        <!-- 待发货 -->
        <!-- <van-button v-if="order_status==1" size="small" type="default" @click="backMoney">申请退款</van-button> -->
        <!-- <van-button v-if="order_status==1" size="small" type="danger" @click="warn">提醒发货</van-button> -->
        <!-- 待收货 -->
        <!-- <van-button v-if="order_status==2" size="small" type="default" @click="backMoney">申请退款</van-button> -->
        <van-button v-if="order_status==2" size="small" type="default" @click="toWuliu">查看物流</van-button>
        <van-button v-if="order_status==2" size="small" type="danger" @click="confirm">确认收货</van-button>
        <!-- 已完成 -->
        <!-- <van-button
          size="small"
          type="danger"
          v-if="order_status==3||order_status==6"
          @click="delOrder"
        >删除订单</van-button>-->
        <!-- 待退货 -->
        <van-button size="small" type="danger" v-if="order_status==4" @click="backDetail">查看退款详情</van-button>
        <!-- 已退货 -->
        <van-button size="small" type="default" v-if="order_status==5">退款完成</van-button>
      </div>
      <pay
        :showpay="showpay"
        :price="price"
        :order_id="order_id"
        :orderType="order_type"
        :freight_money="initdata.freight_money"
        @close="closePay"
      ></pay>
    </div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
import pay from "../../components/pay";
export default {
  components: {
    tabbar,
    pay
  },
  data() {
    return {
      showpay: false,
      price: "", //总价
      order_id: "", //订单id
      initdata: {}, //初始数据
      order_type: "", //订单类型1商城订单2云仓订单3云仓提货订单
      order_status: "", //订单状态 -1=已取消,0=待付款,1=待发货,2=待收货,3=已收货,4=待退货,5=已退货,6=已完成
      payType: "", //支付方式: 1 余额 2 货款 3 微信 4 线下
      tab: "" //订单状态
    };
  },
  mounted() {
    this.order_id = this.$route.query.id;
    this.tab = this.$route.query.tab;
    this.init();
  },
  methods: {
    init() {
      this.axios
        .post("/api/goods_order/orderDetails", {
          id: this.order_id
        })
        .then(data => {
          this.initdata = data;
          this.order_type = data.order_type;
          this.order_status = data.order_status;
          if (data.order_type == 3 && data.order_status == 0) {
            this.price = data.freight_money;
          } else if (data.order_type == 1) {
            this.price = data.goods_money;
          } else {
            this.price = data.order_money;
          }

          // 支付方式
          switch (data.pay_type) {
            case 1:
              this.payType = "余额支付";
              break;
            case 2:
              this.payType = "货款支付";
              break;
            case 3:
              this.payType = "微信支付";
              break;
            case 4:
              this.payType = "线下支付";
              break;
          }
        });
    },
    goback() {
      this.$router.push({
        path: "/orderList",
        query: { orderType: this.order_type, tab: this.tab }
      });
    },
    // 立即付款
    gopay() {
      this.showpay = true;
    },
    closePay() {
      this.showpay = false;
    },
    // 取消订单
    cancel() {
      this.axios
        .post("/api/goods_order/cancelOrder", {
          order_id: this.order_id
        })
        .then(data => {
          this.$toast("取消成功");
          setTimeout(() => {
            this.$router.go(-1);
          });
        });
    },
    // 申请退款
    backMoney() {
      this.$router.push({
        path: "/backMoney",
        query: {
          order_id: 1
        }
      });
    },
    // 提醒发货
    warn() {},
    // 查看物流
    toWuliu() {
      this.$router.push({
        path: "/wuliu",
        query: {
          order_id: this.order_id
        }
      });
    },
    // 确认收货
    confirm() {
      this.axios
        .post("/api/goods_order/confirmTakeOver", {
          order_id: this.order_id
        })
        .then(data => {
          this.$toast("收货成功");
        });
    },
    // 删除订单
    delOrder() {},
    // 查看退款详情
    backDetail() {}
  }
  // beforeRouteEnter(to, from, next) {
  //   console.log(from.path);
  //   if (from.path == "/confirmOrder") {
  //     vms.back = "/orderList";
  //     next();
  //   } else {
  //     next();
  //   }
  // }
};
</script>
<style lang="less">
.orderDetail {
  margin-top: 44px;
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 50px;
  .van-cell__value {
    overflow: visible;
  }
  .detail {
    border-top: 1px solid #f5f5f5;
    .solo {
      margin-top: -10px;
    }
    .con {
      margin: 10px;
      background-color: #fff;
      padding: 5px 10px 1px;
      border-radius: 5px;
      .top {
        margin: 10px 0;
      }
      .pro {
        flex: 1;
        margin-left: 10px;
        .name {
          font-size: 16px;
          margin-bottom: 10px;
          color: #333;
        }
        .price {
          color: red;
          font-size: 14px;
          i {
            font-size: 10px;
          }
        }
        .size {
          padding: 1px 10px;
          background-color: #f5f6f7;
          color: #999;
          font-size: 10px;
          margin-top: 10px;
          display: inline-block;
          border-radius: 8px;
        }
      }
      .item {
        padding-top: 5px;
        .van-cell {
          margin-top: -8px;
          padding: 7px 0;
          &.price {
            font-size: 16px;
            .van-cell__value {
              color: #fc4c4c;
            }
          }
        }
      }
    }
    .foot {
      background-color: #fff;
      width: 100%;
      height: 50px;
      justify-content: flex-end;
      position: fixed;
      left: 0;
      bottom: 0;
      button {
        margin-right: 10px;
      }
    }
  }
}
</style>