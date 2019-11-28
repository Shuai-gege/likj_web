<template>
  <div class="orderList">
    <tabbar v-if="orderType==1" title="我的订单" @back="goback" back="1"></tabbar>
    <tabbar v-else-if="orderType==3" title="提货订单" @back="goback" back="1"></tabbar>
    <tabbar v-else title="云仓订单" @back="goback" back="1"></tabbar>
    <div class="order">
      <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
        <van-tabs v-model="tab" sticky :offset-top="44" @click="clickTab">
          <van-tab title="待付款">
            <div class="null" v-if="list.length==0">暂无订单</div>
            <div class="item" v-for="(item,i) in list" :key="i">
              <van-panel :title="'订单时间：'+item.createtime" :status="item.orderState">
                <div class="con" @click="orderDetail(item.shop_order_id)">
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
                <div slot="footer">
                  <van-button size="small" @click="cancalOrder(item.shop_order_id)">取消订单</van-button>
                  <van-button size="small" type="danger" @click="orderDetail(item.shop_order_id)">付款</van-button>
                </div>
              </van-panel>
            </div>
          </van-tab>
          <van-tab title="待发货">
            <div class="null" v-if="list.length==0">暂无订单</div>
            <div class="item" v-for="(item,i) in list" :key="i">
              <van-panel :title="'订单时间：'+item.createtime" :status="item.orderState">
                <div class="con" @click="orderDetail(item.shop_order_id)">
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
                <div slot="footer">
                  <van-button
                    size="small"
                    type="danger"
                    @click="orderDetail(item.shop_order_id)"
                  >查看详情</van-button>
                </div>
              </van-panel>
            </div>
          </van-tab>
          <van-tab title="待收货" v-if="orderType!=2">
            <div class="null" v-if="list.length==0">暂无订单</div>
            <div class="item" v-for="(item,i) in list" :key="i">
              <van-panel :title="'订单时间：'+item.createtime" :status="item.orderState">
                <div class="con" @click="orderDetail(item.shop_order_id)">
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
                <div slot="footer">
                  <!-- <van-button size="small" @click="backMoney">申请退款</van-button> -->
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
                    @click="orderDetail(item.shop_order_id)"
                  >立即付款</van-button>
                  <!-- 待发货 -->
                  <van-button
                    v-if="item.order_status==1"
                    size="small"
                    type="danger"
                    @click="orderDetail(item.shop_order_id)"
                  >查看详情</van-button>
                  <!-- 待收货 -->
                  <!-- <van-button
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
                  >确认收货</van-button>-->
                  <van-button
                    size="small"
                    type="danger"
                    v-if="item.order_status==2"
                    @click="orderDetail(item.shop_order_id)"
                  >查看详情</van-button>
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
      tab: null, //tab切换高亮
      orderType: 0, //订单类型  1 商城订单  2 云仓  3 提货
      order_state: 0, //订单状态
      list: [], //订单列表
      order_status: "", //订单状态 -1=已取消,0=待付款,1=待发货,2=待收货,3=已完成,4=待退货,5=已退货
      mescrollUp: {
        callback: this.upCallback
      },
      mescroll: null,
      state: "" //订单状态 1 待支付 2 待发货 3 待收货 不传全部
    };
  },
  mounted() {
    this.orderType = this.$route.query.orderType;
    if (this.$route.query.tab) {
      this.tab = this.$route.query.tab;
    }
    if (this.orderType == 2) {
      if (this.tab < 2) {
        this.state = Number(this.tab) + 1;
      } else {
        this.state = "";
      }
    } else {
      this.state = Number(this.tab) + 1;
    }
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      console.log(page);
      this.axios
        .post("/api/goods_order/index", {
          page: page.num,
          order_status: this.state, //订单状态 1 待支付 2 待发货 3 待收货 不传全部
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
    clickTab(name, title) {
      this.tab = name;
      if (this.orderType == 2) {
        //云仓
        if (name < 2) {
          this.state = name + 1;
        } else {
          this.state = "";
        }
      } else {
        this.state = name + 1;
      }
      this.mescroll.resetUpScroll();
    },
    goback() {
      this.$router.push({
        path: "/worker"
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
          id: id,
          tab: this.tab
        }
      });
    },

    // 取消订单
    cancalOrder(id) {
      this.axios
        .post("/api/goods_order/cancelOrder", {
          order_id: id
        })
        .then(data => {
          this.$toast("取消成功");
          setTimeout(() => {
            this.mescroll.resetUpScroll();
          }, 1000);
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

  .mescroll {
    position: fixed;
    top: 44px;
    bottom: 0;
    height: auto;
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