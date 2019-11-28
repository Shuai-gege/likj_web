<template>
  <div class="pay">
    <!-- 支付方式选择 -->
    <van-popup v-model="showpay" position="bottom" round :style="{ height: '50%' }" @close="close">
      <p class="center title">付款详情</p>
      <div class="price center">{{price}} 元</div>
      <div class="tip" v-if="orderType==1">（运费{{freight_money}}元将自动从余额扣除）</div>
      <van-radio-group v-model="radio">
        <van-radio
          class="center"
          v-if="orderType != 3"
          name="2"
          checked-color="rgb(240, 64, 64)"
        >货款支付</van-radio>
        <van-radio
          class="center"
          v-if="orderType == 3"
          name="1"
          checked-color="rgb(240, 64, 64)"
        >余额支付</van-radio>
        <!-- <van-radio class="center" name="4" checked-color="rgb(240, 64, 64)">线下支付</van-radio> -->
        <!-- <van-radio class="center" name="3" checked-color="rgb(240, 64, 64)">微信支付</van-radio> -->
      </van-radio-group>
      <van-button class="button" type="danger" @click="gopay">确认支付</van-button>
    </van-popup>
    <!-- 余额支付密码 -->
    <van-popup
      v-model="showpsd"
      position="bottom"
      round
      :style="{ height: '55%' }"
      @close="closePsd"
    >
      <div class="title1 flex_r" @click="topsd" style="color:#fc4c4c;margin:10px 20px ">
        <van-icon name="question-o" />忘记密码
      </div>
      <van-password-input
        :value="value"
        info="密码为6为数字"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      />
    </van-popup>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      radio: "", // 1 余额  2 货款
      showpsd: false, //密码弹窗
      value: "", // 密码
      showKeyboard: false //数字键盘
    };
  },
  //freight_money运费（订单类型1，运费自动余额扣除） order_type订单类型1商城订单2云仓订单3云仓提货订单
  props: ["showpay", "price", "order_id", "orderType", "freight_money"],
  methods: {
    close() {
      this.$emit("close");
    },
    gopay() {
      console.log(this.radio);
      if (!this.radio) {
        this.$toast("请选择支付方式");
      } else {
        if (this.radio == 1 || this.radio == 2) {
          //余额1货款2支付 判断是否设置支付密码和实名认证
          // 判断是否需要支付密码
          this.axios.post("api/user/index").then(data => {
            // use_pay_password 不需要密码 0 需要 1
            // pay_password 没设置 0  已经设置 1
            if (data.use_pay_password == 0) {
              this.payApi();
            } else {
              if (data.pay_password == 0) {
                Dialog.confirm({
                  title: "设置支付密码",
                  message: "请先设置支付密码再支付"
                })
                  .then(() => {
                    // on confirm
                    this.topsd();
                  })
                  .catch(() => {
                    // on cancel
                  });
              } else {
                this.showpsd = true;
              }
            }
          });
        }
        // else if (this.radio == 3) {
        //   // 调微信支付
        // } else {
        //   //线下支付
        //   this.$router.push("/offline");
        // }
        this.close();
        // if (this.radio != 4) {
        //   this.axios
        //     .post("/api/goods_order/pay", {
        //       order_id: this.order_id,
        //       money: this.price,
        //       pay_type: this.radio, //1 余额  2 货款  4 线下
        //       order_type: this.order_type
        //     })
        //     .then(data => {
        //       this.$toast("支付成功");
        //       setTimeout(() => {
        //         this.$router.push({
        //           path: "/orderList",
        //           query: {
        //             orderType: this.orderType,
        //             tab: 1
        //           }
        //         });
        //       }, 1000);
        //     });
        // } else {
        //   this.$router.push("/offline");
        // }
      }
    },
    closePsd() {
      this.showpsd = false;
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length == 6) {
        this.showpsd = false;
        this.payApi();
      }
    },
    // 支付接口
    payApi() {
      // 走余额支付
      this.axios
        .post("/api/goods_order/pay", {
          order_id: this.order_id,
          money: this.price,
          pay_type: this.radio, //1 余额  2 货款  4 线下
          order_type: this.order_type,
          pay_password: this.value
        })
        .then(data => {
          this.$toast("支付成功");
          setTimeout(() => {
            this.$router.push({
              path: "/orderList",
              query: {
                orderType: this.orderType,
                tab: 1
              }
            });
          }, 1000);
        });
    },
    topsd() {
      this.$router.push("/payPsd");
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  },
  // computed: {
  //   // 计算属性的 getter
  //   radio() {
  //     // `this` 指向 vm 实例
  //     if (this.orderType == 3) {
  //       return "1";
  //     } else {
  //       return "2";
  //     }
  //   }
  // },
  mouted() {
    if (this.orderType == 3) {
      this.radio = "1";
    } else {
      this.radio = "2";
    }
  }
};
</script>
<style lang="less">
.pay {
  font-size: 14px;
  color: #333;
  padding: 10px;

  .title {
    padding: 10px 0;
    border-bottom: 1px solid #f5f6f7;
    i {
      font-size: 18px;
      display: inline-block;
      margin-right: 5px;
    }
  }
  .price {
    font-size: 16px;
    color: rgb(240, 64, 64);
    font-weight: 700;
    margin: 15px;
  }
  .tip {
    text-align: center;
    font-size: 14px;
    color: rgb(10, 212, 168);
  }
  .van-radio {
    border-bottom: 1px solid #f5f5f5;
    padding: 15px;
  }
  .button {
    position: absolute;
    bottom: 10px;
    left: 5%;
    width: 90%;
    margin: 30px auto 0;
    display: block;
  }
  .van-password-input__info {
    color: rgb(248, 55, 55);
  }
}
</style>