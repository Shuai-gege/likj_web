<template>
  <div class="order">
    <navbar title="确认订单" v-if="type!=1"></navbar>
    <navbar title="确认提货单" v-else></navbar>
    <div class="content">
      <!-- 确认订单收货地址 -->
      <div class="site flex" @click="tap" v-if="type!=2&&address">
        <div class="flex_l">
          <van-icon name="location" color="#fc4c4c" size="30px" class="tubiao" />
          <div class="info">
            <p style="font-size:15px;">{{address.name}} {{address.phone}}</p>
            <p
              style="margin-top:8px;"
            >{{address.province_name+address.city_name+address.district_name+address.details}}</p>
          </div>
        </div>
        <van-icon name="arrow" size="18px" style="margin-left:5px;" />
      </div>
      <!-- 确认订单信息 -->
      <div class="car" v-for="(item,i) in goods_list" :key="i" @click="todetail(item.goods_id)">
        <div class="cardateil flex_l">
          <img :src="item.size_image" alt />
          <!-- 商品名字、价钱 -->
          <div class="item">
            <p
              style="font-size:15px;color:#333;margin:5px 0;width:210px;"
              class="yihang"
            >{{item.name}}</p>
            <p style="color:#FF4444;font-size:15px;margin-bottom:8px" class="flex">
              <span>
                ￥
                <b>{{item.self_price}}</b>
              </span>
              <span style="color:#000">x{{item.buy_num}}</span>
            </p>
            <span class="size">{{item.size_name+item.size_value}}</span>
          </div>
        </div>
        <!-- 订单详细信息 -->
        <van-cell title="购买数量">{{item.buy_num}}件</van-cell>
        <div class="flex_r" style="margin:5px">
          <p>
            共{{item.buy_num}}件
            <span style="color:black;">
              小计：
              <span style="color:#FC4C4C;">￥{{item.good_moneys}}</span>
            </span>
          </p>
        </div>
      </div>

      <!-- 运费 -->
      <van-cell
        style="margin-top:10px;border-radius: 5px 5px 0 0; "
        title="运费"
      >{{freight_money?`￥${freight_money}`:'快递 免邮'}}</van-cell>
      <van-cell style="margin-top:-4px;border-radius:0 0 5px 5px;" title="订单总额">￥{{price}}</van-cell>
      <van-cell
        v-if="type==1"
        style="margin-top:-4px;border-radius:0 0 5px 5px;color:#fc4c4c"
        title="应付金额"
        class="jine"
      >￥{{freight_money}}</van-cell>
    </div>
    <van-submit-bar
      v-if="type==1"
      :price="freight_money*100"
      button-text="确认提货"
      @submit="onSubmit(1)"
    />
    <van-submit-bar v-if="type==0" :price="price*100" button-text="提交订单" @submit="onSubmit(0)" />
    <van-submit-bar v-if="type==2" :price="price*100" button-text="加入云仓" @submit="onSubmit(2)" />
    <!-- <pay v-if="type!=1" :showpay="showpay" :price="price" :order_id="order_id" @close="closePay"></pay> -->
  </div>
</template>
<script>
import navbar from "@/components/navbar";
import pay from "@/components/pay";
import { Dialog } from "vant";
export default {
  data() {
    return {
      query: "", //立即购买或购物车提交过来的参数
      type: null, //列表类型 0 商城列表  1 本地仓库提货不付钱  2 放入云仓不填地址
      showpay: false,

      price: "", //总价
      address: {}, //地址
      freight_money: "", //运费
      goods_list: [], //商品列表
      order_id: "", //订单提交后生成的订单id
      session_goods: "" //后台要的
    };
  },
  components: {
    navbar,
    pay
  },
  mounted() {
    this.query = this.$route.query;
    this.type = this.$route.query.type;
    this.init();
  },
  methods: {
    init() {
      this.axios
        .post("/api/goods_order/confirmOrder", {
          cart_ids: this.query.cart_ids
        })
        .then(data => {
          this.session_goods = data.session_goods;
          if (this.$route.query.address_id) {
            this.axios
              .post("/api/Address/edit", {
                address_id: this.$route.query.address_id
              })
              .then(data => {
                this.address = data;
              });
          } else {
            this.address = data.address;
          }
          this.price = parseFloat(data.goods_money);

          console.log(data.goods_money);
          console.log(parseFloat(data.goods_money));

          this.freight_money = data.freight_money;
          this.goods_list = data.goods_list;
          if (this.type != 2 && !this.address) {
            // 先判断有没有收货地址，如果没有提示添加收货地址
            Dialog.confirm({
              title: "请先添加收货地址",
              // message: "您可以选择直接购买或放入本地仓库中",
              confirmButtonText: "添加地址",
              confirmButtonColor: "#fc4c4c",
              cancelButtonText: "取消",
              cancelButtonColor: "#666"
            })
              .then(() => {
                // on confirm
                this.$router.push({
                  path: "/add_address",
                  query: {
                    source: 1 //来源
                  }
                });
              })
              .catch(() => {
                // on cancel
                this.$router.go(-1);
              });
          }
        });
    },
    todetail(id) {
      this.$router.push({
        path: "/detail",
        query: {
          goods_id: id
        }
      });
    },
    // 点击提交订单
    onSubmit(type) {
      let querys = {};
      if (type == 0) {
        querys = {
          address_id: this.address.address_id,
          type: 1, //1=商城,2=云仓,3=提货
          session_goods: this.session_goods
        };
      } else if (type == 2) {
        querys = {
          type: 2, //1=商城,2=云仓,3=提货
          session_goods: this.session_goods
        };
      } else {
        querys = {
          address_id: this.address.address_id,
          type: 3, //1=商城,2=云仓,3=提货
          session_goods: this.session_goods
        };
      }
      console.log(querys);
      this.axios.post("/api/goods_order/placeOrder", querys).then(data => {
        console.log(222);
        this.order_id = data.order_id;
        this.$router.push({
          path: "/orderDetail",
          query: {
            order_id: this.order_id
          }
        });
        // this.showpay = true;
      });
      // if (type == 0) {
      //   // 调提交订单接口
      //   this.showpay = true;
      // } else if (type == 1) {
      //   // 调提货接口
      //   this.$router.push({
      //     path: "/orderList",
      //     query: {
      //       orderType: this.type + 1
      //     }
      //   });
      // } else {
      //   // 调加入云仓提交订单
      //   this.showpay = true;
      // }
    },
    // closePay() {
    //   this.showpay = false;
    //   this.$router.push({
    //     path: "/orderList",
    //     query: {
    //       orderType: this.type + 1
    //     }
    //   });
    // },
    // 点击收货地址
    tap() {
      this.$router.push({
        path: "/address",
        query: Object.assign(this.query, {
          source: 1 //来源
        })
      });
    }
  }
};
</script>
<style lang="less" scoped>
.order {
  background: #f5f5f5;
  padding-bottom: 45px;
  padding-top: 44px;
  min-height: 100vh;
  margin-top: -1px;
  .content {
    padding: 10px;
    .site {
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 15px;
      background: #fff;
    }
    .tubiao {
      margin-right: 10px;
    }
    .car {
      padding: 5px 10px;
      background-color: #fff;
      width: 100%;
      border-radius: 5px;
      img {
        width: 80px;
        height: 80px;
        margin-top: 10px;
        border-radius: 15px;
      }
      .item {
        flex: 1;
        margin-left: 10px;
      }
      .size {
        background-color: #fc4c4c;
        color: #fff;
        padding: 2px 10px;
        border-radius: 10px;
      }
    }
    .jine .van-cell__value {
      color: #fc4c4c;
    }
    .van-cell__value {
      color: #666;
    }
  }
}
</style>