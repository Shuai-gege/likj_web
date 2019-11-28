<template>
  <div class="orderList">
    <tabbar title="转单列表"></tabbar>
    <div class="order">
      <van-tabs v-model="tab" sticky :offset-top="44" @click="clickTab">
        <van-tab title="待发货">
          <div class="null" v-if="list.length==0">暂无转单记录</div>
          <div class="item" v-for="(item,i) in list" :key="i">
            <van-panel :title="'订单时间：'+item.createtime" :status="item.orderState">
              <div class="con">
                <div
                  class="top flex_l"
                  v-for="(gooditem,index) in item.goods_list"
                  :key="index"
                  @click.stop="tiao(gooditem.goods_id)"
                >
                  <van-image
                    width="2.5rem"
                    height="2.5rem"
                    fit="cover"
                    :src="gooditem.cover_Image"
                  />
                  <div class="pro">
                    <div class="name erhang">{{gooditem.name}}</div>
                    <div class="price flex">
                      <span>
                        <i>￥</i>
                        {{gooditem.price}}
                      </span>
                      <span style="color:#999;">x {{gooditem.goods_num}}</span>
                    </div>
                    <div class="size">{{gooditem.space_name}}</div>
                  </div>
                </div>
                <van-cell-group>
                  <van-cell title="订单编号" :value="item.order_number" />
                </van-cell-group>
                <div class="foot">共1件商品 &nbsp; 实付:￥{{item.order_money}}</div>
              </div>
            </van-panel>
          </div>
        </van-tab>
        <van-tab title="已完成">
          <div class="null" v-if="list.length==0">暂无完成转单</div>
          <div class="item" v-for="(item,i) in list" :key="i">
            <van-panel :title="'订单时间：'+item.createtime" :status="item.orderState">
              <div class="con">
                <div
                  class="top flex_l"
                  v-for="(gooditem,index) in item.goods_list"
                  :key="index"
                  @click.stop="tiao(gooditem.goods_id)"
                >
                  <van-image
                    width="2.5rem"
                    height="2.5rem"
                    fit="cover"
                    :src="gooditem.cover_Image"
                  />
                  <div class="pro">
                    <div class="name erhang">{{gooditem.name}}</div>
                    <div class="price flex">
                      <span>
                        <i>￥</i>
                        {{gooditem.price}}
                      </span>
                      <span style="color:#999;">x {{gooditem.goods_num}}</span>
                    </div>
                    <div class="size">{{gooditem.space_name}}</div>
                  </div>
                </div>
                <van-cell-group>
                  <van-cell title="订单编号" :value="item.order_number" />
                </van-cell-group>
                <div class="foot">共1件商品 &nbsp; 实付:￥{{item.order_money}}</div>
              </div>
            </van-panel>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
export default {
  components: {
    tabbar
  },
  data() {
    return {
      tab: null, //tab切换高亮
      order_state: 0, //订单状态
      list: [], //订单列表
      order_status: "" //订单状态 -1=已取消,0=待付款,1=待发货,2=待收货,3=已完成,4=待退货,5=已退货
    };
  },
  mounted() {
    if (this.$route.query.tab) {
      this.tab = this.$route.query.tab;
      this.init(Number(this.tab) + 2);
    }
  },
  methods: {
    init(state) {
      this.axios
        .post("/api/goods_order/myShiftOrder", {
          order_status: state, //订单状态2 待发货 3 待收货 不传全部
          order_type: this.orderType //1 商城 2 云仓 3 提货
        })
        .then(data => {
          data.forEach(item => {
            let flag;
            switch (item.order_status) {
              case -1:
                flag = "已取消";
                break;
              case 0:
                flag = "待付款";
                break;
              case 1:
                flag = "待发货";
                break;
              case 2:
                flag = "待收货";
                break;
              case 3:
                flag = "已完成";
                break;
              case 4:
                flag = "退款中";
                break;
              case 5:
                flag = "已退款";
                break;
              case 6:
                flag = "已完成";
                break;
            }
            this.$set(item, "orderState", flag);
          });
          this.list = data;
          console.log(this.list);
        });
    },
    // 点击tab切换
    clickTab(name, title) {
      this.init(name + 2);
    },

    // 订单详情
    orderDetail(id) {
      this.$router.push({
        path: "/xiajiorderDetail",
        query: {
          order_id: id
        }
      });
    },
    // 立即付款
    gopay() {
      this.showpay = true;
    },
    closePay() {
      this.showpay = false;
      // this.$router.push({
      //   path: "/orderList",
      //   query: {
      //     orderType: this.type + 1
      //   }
      // });
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
          order_id: 1
        }
      });
    },
    // 确认收货
    confirm() {},
    // 删除订单
    delOrder() {},
    // 查看退款详情
    backDetail() {},
    tiao(goods_id) {
      this.$router.push({
        path: "/detail",
        query: {
          goods_id
        }
      });
    }
  }
  // beforeRouteEnter(to, from, next) {
  //   console.log(from.path);
  //   if (from.path == "/orderDetail") {
  //     vms.back = "/my";
  //     next();
  //   } else {
  //     next();
  //   }
  // }
};
</script>
<style lang="less">
.order {
  padding-top: 44px;
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 10px;

  .item {
    margin: 12px 12px 0;
    .van-cell {
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      padding: 10px 5px;
    }
    .van-cell-group {
      border-radius: 6px;
    }
    .van-cell__title {
      font-size: 13px;
    }
    .van-cell__value {
      -webkit-box-flex: none;
      -webkit-flex: none;
      flex: none;
    }
    .con {
      margin-top: -1px;
      padding: 0 10px 10px;
      .top {
        margin: 10px 0;
      }
      img {
        border-radius: 5px;
        border: 1px solid #f5f5f5;
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
      .foot {
        margin-top: 5px;
        text-align: right;
      }
    }
    .van-panel__footer {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>