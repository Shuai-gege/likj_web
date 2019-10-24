<template>
  <div class="orderList">
    <tabbar title="下级订单" @back="goback"></tabbar>
    <div class="order">
      <van-tabs v-model="tab" sticky :offset-top="44" @click="clickTab">
        <van-tab title="待付款">
          <div class="null" v-if="list.length==0">暂无商品</div>
          <mescroll-vue ref="mescroll1" :up="mescrollUp1" @init="mescrollInit1">
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
                  <!-- <van-button size="small">取消订单</van-button> -->
                  <van-button
                    size="small"
                    type="danger"
                    @click="orderDetail(item.shop_order_id)"
                  >查看详情</van-button>
                </div>
              </van-panel>
            </div>
          </mescroll-vue>
        </van-tab>
        <van-tab title="待发货">
          <div class="null" v-if="list.length==0">暂无商品</div>
          <mescroll-vue ref="mescroll2" :up="mescrollUp2" @init="mescrollInit2">
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
                  <van-button size="small" @click="fahuo(item.shop_order_id)">立即发货</van-button>
                  <van-button size="small" type="danger" @click="zhuandan(item.shop_order_id)">转单</van-button>
                </div>
              </van-panel>
            </div>
          </mescroll-vue>
        </van-tab>
        <van-tab title="已完成">
          <div class="null" v-if="list.length==0">暂无商品</div>
          <mescroll-vue ref="mescroll3" :up="mescrollUp3" @init="mescrollInit3">
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
                  <van-button
                    size="small"
                    type="default"
                    @click="orderDetail(item.shop_order_id)"
                  >查看详情</van-button>
                </div>
              </van-panel>
            </div>
          </mescroll-vue>
        </van-tab>
        <van-tab title="全部">
          <div class="null" v-if="list.length==0">暂无商品</div>
          <mescroll-vue ref="mescroll4" :up="mescrollUp4" @init="mescrollInit4">
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
          </mescroll-vue>
        </van-tab>
      </van-tabs>
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
      tab: 0, //tab切换高亮
      order_state: 0, //订单状态
      list: [], //订单列表
      page: 1,
      order_status: "", //订单状态 -1=已取消,0=待付款,1=待发货,2=待收货,3=已完成,4=待退货,5=已退货

      // 三个配置项
      mescrollUp1: {
        callback: this.upCallback
      },
      mescrollUp2: {
        callback: this.upCallback
      },
      mescrollUp3: {
        callback: this.upCallback
      },
      mescrollUp4: {
        callback: this.upCallback
      },
      // 使用数组接收三个列表
      navData: [
        {
          tit: "代付款",
          mescroll: null,
          list: []
        },
        {
          tit: "待发货",
          mescroll: null,
          list: []
        },
        {
          tit: "已完成",
          mescroll: null,
          list: []
        },
        {
          tit: "全部",
          mescroll: null,
          list: []
        }
      ]
    };
  },
  mounted() {
    this.init(Number(this.tab) + 1);
    // alert(location.href);
    // alert(location.protocol + "//" + location.hostname);
    if (this.$route.query.sign_id) {
      // alert(111);
      localStorage.setItem("sign_id", this.$route.query.sign_id);
      localStorage.setItem(
        "baseURL",
        location.protocol + "//" + location.hostname
      );
    }
    if (
      !localStorage.getItem("token" + localStorage.getItem("sign_id")) &&
      !this.$route.query.token
    ) {
      // alert(33333333);

      location.href =
        localStorage.getItem("baseURL") +
        "/api/user/wxlogin?sign_id=" +
        localStorage.getItem("sign_id");
    } else if (
      !localStorage.getItem("token" + localStorage.getItem("sign_id")) &&
      this.$route.query.token
    ) {
      // alert(11111111111);
      // alert(this.$route.query.token);
      localStorage.setItem(
        "token" + localStorage.getItem("sign_id"),
        this.$route.query.token
      );
      // this.init();
    } else if (
      localStorage.getItem("token" + localStorage.getItem("sign_id"))
    ) {
      // alert(666);
      // this.init();
    }
  },
  methods: {
    // 三个初始化方法
    mescrollInit1(mescroll) {
      this.navData[1].mescroll = mescroll;
    },
    mescrollInit2(mescroll) {
      this.navData[2].mescroll = mescroll;
    },
    mescrollInit3(mescroll) {
      this.navData[3].mescroll = mescroll;
    },
    mescrollInit4(mescroll) {
      this.navData[4].mescroll = mescroll;
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
    init(state) {
      this.axios
        .post("/api/goods_order/myLowerOrder", {
          order_status: state, //订单状态 1 待支付 2 待发货 3 已完成  不传全部
          page: this.page
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
      console.log(name);
      this.init(name + 1);
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
          setTimeout(() => {
            this.init(2);
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
  padding-top: 44px;
  background-color: #f5f6f7;
  min-height: 100vh;
  padding-bottom: 10px;
  .mescroll {
    position: fixed;
    top: 85px;
    bottom: 0;
    height: auto;
  }
  .null {
    background-color: #f5f6f7;
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