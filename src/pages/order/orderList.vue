<template>
  <div class="orderList">
    <tabbar v-if="orderType==1" title="商城订单" @back="goback" back="1"></tabbar>
    <tabbar v-else-if="orderType==3" title="提货订单" @back="goback" back="1"></tabbar>
    <tabbar v-else title="云仓订单" @back="goback" back="1"></tabbar>
    <div class="order">
      <van-tabs v-model="tab" sticky :offset-top="44" @click="clickTab">
        <van-tab title="待付款">
          <div class="null" v-if="list.length==0">暂无商品</div>
          <div class="item" v-for="(item,i) in list" :key="i">
            <van-panel :title="'订单时间：'+item.createtime" :status="item.orderState">
              <div class="con" @click="orderDetail(item.shop_order_id)">
                <div class="top flex_l" v-for="(gooditem,index) in item.goods_list" :key="index">
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
              <div slot="footer">
                <van-button size="small" @click="cancalOrder(item.shop_order_id)">取消订单</van-button>
                <van-button size="small" type="danger" @click="orderDetail(item.shop_order_id)">付款</van-button>
              </div>
            </van-panel>
          </div>
        </van-tab>
        <van-tab title="待发货">
          <div class="null" v-if="list.length==0">暂无商品</div>
          <div class="item" v-for="(item,i) in list" :key="i">
            <van-panel :title="'订单时间：'+item.createtime" :status="item.orderState">
              <div class="con" @click="orderDetail(item.shop_order_id)">
                <div class="top flex_l" v-for="(gooditem,index) in item.goods_list" :key="index">
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
              <div slot="footer">
                <van-button size="small" @click="backMoney">申请退款</van-button>
                <van-button size="small" type="danger">提醒发货</van-button>
              </div>
            </van-panel>
          </div>
        </van-tab>
        <van-tab title="待收货" v-if="orderType!=2">
          <div class="null" v-if="list.length==0">暂无商品</div>
          <div class="item" v-for="(item,i) in list" :key="i">
            <van-panel :title="'订单时间：'+item.createtime" :status="item.orderState">
              <div class="con" @click="orderDetail(item.shop_order_id)">
                <div class="top flex_l" v-for="(gooditem,index) in item.goods_list" :key="index">
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
              <div slot="footer">
                <van-button size="small" @click="backMoney">申请退款</van-button>
                <van-button size="small" @click="toWuliu(item.shop_order_id)">查看物流</van-button>
                <van-button size="small" type="danger" @click="confirm(item.shop_order_id)">确认收货</van-button>
              </div>
            </van-panel>
          </div>
        </van-tab>
        <van-tab title="全部">
          <div class="null" v-if="list.length==0">暂无商品</div>
          <div class="item" v-for="(item,i) in list" :key="i">
            <van-panel :title="'订单时间：'+item.createtime" :status="item.orderState">
              <div class="con" @click="orderDetail(item.shop_order_id)">
                <div class="top flex_l" v-for="(gooditem,index) in item.goods_list" :key="index">
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
              <div slot="footer">
                <!-- 已取消 -->
                <van-button v-if="item.order_status==-1" size="small" type="default">订单已取消</van-button>
                <!-- 代付款 -->
                <van-button
                  v-if="item.order_status==0"
                  size="small"
                  type="default"
                  @click="cancalOrder(item.shop_order_id)"
                >取消订单</van-button>
                <van-button
                  v-if="item.order_status==0"
                  size="small"
                  type="danger"
                  @click="gopay"
                >立即付款</van-button>
                <!-- 待发货 -->
                <van-button
                  v-if="item.order_status==1"
                  size="small"
                  type="default"
                  @click="backMoney"
                >申请退款</van-button>
                <van-button
                  v-if="item.order_status==1"
                  size="small"
                  type="danger"
                  @click="warn"
                >提醒发货</van-button>
                <!-- 待收货 -->
                <van-button
                  v-if="item.order_status==2"
                  size="small"
                  type="default"
                  @click="backMoney"
                >申请退款</van-button>
                <van-button
                  v-if="item.order_status==2"
                  size="small"
                  type="default"
                  @click="toWuliu(item.shop_order_id)"
                >查看物流</van-button>
                <van-button
                  v-if="item.order_status==2"
                  size="small"
                  type="danger"
                  @click="confirm(item.shop_order_id)"
                >确认收货</van-button>
                <!-- 已完成 -->
                <van-button
                  size="small"
                  type="danger"
                  v-if="item.order_status==3||item.order_status==6"
                  @click="delOrder"
                >删除订单</van-button>
                <!-- 待退货 -->
                <van-button
                  size="small"
                  type="danger"
                  v-if="item.order_status==4"
                  @click="backDetail"
                >查看退款详情</van-button>
                <!-- 已退货 -->
                <van-button size="small" type="default" v-if="item.order_status==5">退款完成</van-button>
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
      tab: 1, //tab切换高亮
      orderType: 0, //订单类型  1 商城订单  2 云仓  3 提货
      order_state: 0, //订单状态
      list: [], //订单列表
      order_status: "" //订单状态 -1=已取消,0=待付款,1=待发货,2=待收货,3=已完成,4=待退货,5=已退货
      // back: "" //返回路径
    };
  },
  mounted() {
    this.orderType = this.$route.query.orderType;
    if (this.$route.query.tab) {
      this.tab = this.$route.query.tab;
    }
    this.init(Number(this.tab) + 1);
  },
  methods: {
    init(state) {
      this.axios
        .post("/api/goods_order/index", {
          order_status: state, //订单状态 1 待支付 2 待发货 3 待收货 不传全部
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
      if (this.orderType == 2) {
        //云仓
        if (name < 2) {
          this.init(name + 1);
        } else {
          this.init();
        }
      } else {
        this.init(name + 1);
      }
    },
    goback() {
      this.$router.push({
        path: "/my"
      });
      // if (vms.back) {
      //   this.$router.push({
      //     path: vms.back
      //   });
      // } else {
      //   this.$router.go(-1);
      // }
    },
    // 订单详情
    orderDetail(id) {
      this.$router.push({
        path: "/orderDetail",
        query: {
          id: id
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
    // 取消定单
    cancalOrder(id) {
      this.$router.push({
        path: "/orderDetail",
        query: {
          id: id
        }
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
    toWuliu(id) {
      this.$router.push({
        path: "/wuliu",
        query: {
          order_id: id
        }
      });
    },
    // 确认收货
    confirm(id) {
      this.$router.push({
        path: "/orderDetail",
        query: {
          id: id
        }
      });
    },
    // 删除订单
    delOrder() {},
    // 查看退款详情
    backDetail() {}
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
  .null {
    background: #f5f5f5;
  }
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