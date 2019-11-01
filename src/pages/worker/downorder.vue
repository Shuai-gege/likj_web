<template>
  <div class="orderList">
    <tabbar title="下级订单" @back="goback" v-if="!$route.query.sign_id"></tabbar>
    <div class="order" style="padding-top: 44px;">
      <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
        <van-tabs v-model="tab" sticky :offset-top="44" @click="clickTab">
          <van-tab title="待付款">
            <div class="null" v-if="list.length==0">暂无商品</div>
            <div class="item" v-for="(item,i) in list" :key="i">
              <van-panel :title="'订单编号：'+item.order_number" :status="item.orderState">
                <div class="con" @click="orderDetail(item.shop_order_id)">
                  <div class="top flex_l" v-for="(gooditem,index) in item.goods_list" :key="index">
                    <van-image
                      width="2.1rem"
                      height="2.1rem"
                      fit="cover"
                      :src="gooditem.cover_Image"
                    />
                    <div class="pro" style="width:70%;">
                      <div class="name yihang">{{gooditem.name}}</div>
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
                    <van-cell title="订单时间" :value="item.createtime" />
                  </van-cell-group>
                  <div class="foot">
                    共1件商品 &nbsp; 实付:
                    <i>￥{{item.order_money}}</i>
                  </div>
                </div>
                <div slot="footer" class="flex" style="width:100%;">
                  <div style="width: 80%;padding:5px 0;" class="flex_l">
                    <img
                      :src="item.wx_avatar"
                      alt
                      style="border-radius:50%;width:30px;margin:0 5px;"
                    />
                    <i
                      style="color:#333;font-size:14px;"
                      v-if="item.agent_name&&item.wx_nickname"
                    >{{item.wx_nickname}}（{{item.agent_name}}）</i>
                  </div>
                  <van-button
                    size="small"
                    type="danger"
                    @click="orderDetail(item.shop_order_id)"
                  >查看详情</van-button>
                </div>
              </van-panel>
            </div>
          </van-tab>
          <van-tab title="待发货">
            <div class="null" v-if="list.length==0">暂无商品</div>
            <div class="item" v-for="(item,i) in list" :key="i">
              <van-panel :title="'订单编号：'+item.order_number" :status="item.orderState">
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
                    <van-cell title="订单时间" :value="item.createtime" />
                  </van-cell-group>
                  <div class="foot">
                    共1件商品 &nbsp; 实付:
                    <i>￥{{item.order_money}}</i>
                  </div>
                </div>
                <div slot="footer" style="width: 100%;" class="flex">
                  <div style="width: 70%;padding:5px 0;" class="flex_l">
                    <img
                      :src="item.wx_avatar"
                      alt
                      style="border-radius:50%;width:30px;margin:0 5px;"
                    />
                    <i
                      style="color:#333;font-size:14px;"
                      v-if="item.agent_name&&item.wx_nickname"
                    >{{item.wx_nickname}}（{{item.agent_name}}）</i>
                  </div>
                  <van-button size="small" @click="fahuo(item.shop_order_id)" color="#EE0A24">立即发货</van-button>
                  <van-button size="small" @click="zhuandan(item.shop_order_id)">转单</van-button>
                </div>
              </van-panel>
            </div>
          </van-tab>
          <van-tab title="已完成">
            <div class="null" v-if="list.length==0">暂无商品</div>
            <div class="item" v-for="(item,i) in list" :key="i">
              <van-panel :title="'订单编号：'+item.order_number" :status="item.orderState">
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
                    <van-cell title="订单时间" :value="item.createtime" />
                  </van-cell-group>
                  <div class="foot">
                    共1件商品 &nbsp; 实付:
                    <i>￥{{item.order_money}}</i>
                  </div>
                </div>
                <div slot="footer" style="width:100%" class="flex">
                  <div style="width: 70%;padding:5px 0;" class="flex_l">
                    <img
                      :src="item.wx_avatar"
                      alt
                      style="border-radius:50%;width:30px;margin:0 5px;"
                    />
                    <i
                      style="color:#333;font-size:14px;"
                      v-if="item.agent_name&&item.wx_nickname"
                    >{{item.wx_nickname}}（{{item.agent_name}}）</i>
                  </div>
                  <!-- 已取消 -->
                  <van-button
                    size="small"
                    type="default"
                    @click="orderDetail(item.shop_order_id)"
                  >查看详情</van-button>
                </div>
              </van-panel>
            </div>
          </van-tab>
          <van-tab title="全部">
            <div class="null" v-if="list.length==0">暂无商品</div>
            <div class="item" v-for="(item,i) in list" :key="i">
              <van-panel :title="'订单编号：'+item.order_number" :status="item.orderState">
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
                    <van-cell title="订单时间" :value="item.createtime" />
                  </van-cell-group>
                  <div class="foot">
                    共1件商品 &nbsp; 实付:￥
                    <i>{{item.order_money}}</i>
                  </div>
                </div>
                <div slot="footer" style="width:100%;" class="flex">
                  <div style="width: 70%;padding:5px 0;" class="flex_l">
                    <img
                      :src="item.wx_avatar"
                      alt
                      style="border-radius:50%;width:30px;margin:0 5px;"
                    />
                    <i
                      style="color:#333;font-size:14px;"
                      v-if="item.agent_name&&item.wx_nickname"
                    >{{item.wx_nickname}}（{{item.agent_name}}）</i>
                  </div>
                  <!-- 已取消 -->
                  <van-button v-if="item.order_status==-1" size="small" type="default">订单已取消</van-button>
                  <!-- 代付款 -->
                  <van-button
                    v-if="item.order_status==0"
                    size="small"
                    type="danger"
                    @click="orderDetail(item.shop_order_id)"
                  >查看详情</van-button>
                  <!-- 待发货 -->
                  <van-button
                    v-if="item.order_status==1"
                    size="small"
                    type="default"
                    @click="fahuo(item.shop_order_id)"
                  >立即发货</van-button>
                  <van-button
                    v-if="item.order_status==1"
                    size="small"
                    type="danger"
                    @click="zhuandan(item.shop_order_id)"
                  >转单</van-button>
                  <!-- 已完成 -->
                  <van-button
                    size="small"
                    type="danger"
                    v-if="item.order_status==3||item.order_status==6"
                    @click="orderDetail(item.shop_order_id)"
                  >查看详情</van-button>
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
      </mescroll-vue>
    </div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  components: {
    tabbar,
    MescrollVue
  },
  data() {
    return {
      tab: 1, //tab切换高亮
      order_state: 0, //订单状态
      list: [], //订单列表
      page: 1,
      order_status: "", //订单状态 -1=已取消,0=待付款,1=待发货,2=待收货,3=已完成,4=待退货,5=已退货
      mescrollUp: {
        callback: this.upCallback
      },
      mescroll: null
    };
  },
  mounted() {
    // this.init(Number(this.tab) + 1);
    // alert(location.href);
    // alert(location.protocol + "//" + location.hostname);
    // if (this.$route.query.sign_id) {
    //   // alert(111);
    //   localStorage.setItem("sign_id", this.$route.query.sign_id);
    //   localStorage.setItem(
    //     "baseURL",
    //     location.protocol + "//" + location.hostname
    //   );
    // }
    // if (
    //   !localStorage.getItem("token" + localStorage.getItem("sign_id")) &&
    //   !this.$route.query.token
    // ) {
    //   // alert(33333333);
    //   location.href =
    //     localStorage.getItem("baseURL") +
    //     "/api/user/wxlogin?sign_id=" +
    //     localStorage.getItem("sign_id");
    // } else if (
    //   !localStorage.getItem("token" + localStorage.getItem("sign_id")) &&
    //   this.$route.query.token
    // ) {
    //   // alert(11111111111);
    //   // alert(this.$route.query.token);
    //   localStorage.setItem(
    //     "token" + localStorage.getItem("sign_id"),
    //     this.$route.query.token
    //   );
    //   // this.init();
    // } else if (
    //   localStorage.getItem("token" + localStorage.getItem("sign_id"))
    // ) {
    //   // alert(666);
    //   // this.init();
    // }
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      console.log(page);
      this.axios
        .post("/api/goods_order/myLowerOrder", {
          page: page.num,
          order_status: Number(this.tab) + 1 //订单状态 1 待支付 2 待发货 3 已完成  不传全部
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
          // 请求的列表数据
          let arr = data;
          // 如果是第一页需手动置空列表
          if (page.num === 1) {
            this.list = [];
          }
          // 把请求到的数据添加到列表
          this.list = this.list.concat(arr);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length, true);
          });
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    },

    // 点击tab切换
    clickTab(name, title, mescroll) {
      console.log(name);
      this.tab = Number(name);
      this.mescroll.resetUpScroll();
    },
    // 发货
    fahuo(id) {
      this.axios
        .post("/api/goods_order/deliveryGoods", {
          order_id: id
        })
        .then(data => {
          this.$toast("发货成功");
          this.tab = 2;
          history.go(0);
        });
    },
    // 转单
    zhuandan(id) {
      this.axios
        .post("/api/goods_order/shiftOrder", {
          order_id: id
        })
        .then(data => {
          this.$toast("转单成功");
          history.go(0);
          setTimeout(() => {
            // this.init(2);
          }, 1000);
        });
    },
    goback() {
      this.$router.push({
        path: "/worker"
      });
    },
    // 订单详情
    orderDetail(id) {
      this.$router.push({
        path: "/xiajiorderDetail",
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
  background-color: #f5f6f7;
  min-height: 100vh;
  padding-bottom: 10px;
  i {
    color: #fc4c4c;
  }
  .van-button--small {
    width: 80px;
  }
  .mescroll {
    position: fixed;
    top: 44px;
    bottom: 0;
    height: auto;
  }
  .null {
    background-color: #f5f6f7;
  }
  .item {
    margin: 12px 12px 10px;
    .van-cell {
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      padding: 10px;
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
          font-size: 14px;
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
      padding: 5px;
    }
  }
}
</style>