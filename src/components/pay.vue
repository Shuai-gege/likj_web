<template>
  <div class="pay">
    <!-- 支付方式选择 -->
    <van-popup v-model="showpay" position="bottom" round :style="{ height: '50%' }" @close="close">
      <p class="center title">{{orderType == 1?'选择运费支付方式':'付款详情'}}</p>
      <div class="price center">{{orderType == 1?'运费':''}}{{price}} 元</div>
      <div class="tip" v-if="orderType==1">（商品费用:{{huokuan}} 将从货款扣除）</div>
      <van-radio-group
        v-model="radio"
        v-if="orderType != 1||(orderType == 1&&parseFloat(freight_money)>0)"
      >
        <van-radio
          class="center"
          v-if="orderType == 3||orderType == 1"
          name="1"
          checked-color="rgb(240, 64, 64)"
        >余额支付</van-radio>
        <van-radio
          class="center"
          v-if="orderType ==2"
          name="2"
          checked-color="rgb(240, 64, 64)"
        >货款支付</van-radio>
        <van-radio
          class="center"
          name="3"
          v-if="(orderType == 3||orderType == 1)&&wechat_status==1"
          checked-color="rgb(240, 64, 64)"
        >微信支付</van-radio>
        <!-- <van-radio class="center" name="4" checked-color="rgb(240, 64, 64)">线下支付</van-radio> -->
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
      radio: "", //1 余额  2 货款  3 微信
      showpsd: false, //密码弹窗
      value: "", //密码
      showKeyboard: false, //数字键盘
      master_type: "", //支付类型:1=公众号支付,2=小程序支付,3=手机网站支付,4=app支付,5=企业付款
      tel: "", //手机号
      wechat_status: "" //微信支付开关  1开启 0关闭
    };
  },
  //freight_money运费（订单类型1，运费自动余额扣除） order_type订单类型 1 非云仓2云仓订单3云仓提货订单 huokuan非云仓的货款
  props: [
    "showpay",
    "price",
    "order_id",
    "orderType",
    "freight_money",
    "huokuan"
  ],
  methods: {
    close() {
      this.$emit("close");
    },
    gopay() {
      console.log(this.radio);
      if (
        !this.radio &&
        !(this.orderType == 1 && parseFloat(this.freight_money) == 0)
      ) {
        this.$toast("请选择支付方式");
      } else {
        this.close();
        if (this.orderType == 1 && parseFloat(this.freight_money) == 0) {
          this.radio = 1;
        }
        if (this.orderType == 1 && parseFloat(this.freight_money) == 0) {
          // 判断是否需要支付密码
          this.axios.post("api/user/index").then(data => {
            this.tel = data.mobile;
            // use_pay_password 不需要密码 0 需要 1
            // pay_password 没设置 0  已经设置 1
            if (data.use_pay_password == 0) {
              let query = {
                order_id: this.order_id,
                pay_type: 1 //1 余额  2 货款  3 微信
              };
              this.payApi(query);
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
        } else {
          if (this.radio == 1 || this.radio == 2) {
            //余额1货款2支付 判断是否设置支付密码和实名认证
            // 判断是否需要支付密码
            this.axios.post("api/user/index").then(data => {
              this.tel = data.mobile;
              // use_pay_password 不需要密码 0 需要 1
              // pay_password 没设置 0  已经设置 1
              if (data.use_pay_password == 0) {
                let query = {
                  order_id: this.order_id,
                  pay_type: this.radio //1 余额  2 货款  3 微信
                };
                this.payApi(query);
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
          } else if (this.radio == 3) {
            // 调微信支付
            //判断浏览器是否是微信浏览器
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
              // alert("微信环境，走微信登录");
              this.master_type = 1;
            } else {
              this.master_type = 3;
            }
            let query = {
              order_id: this.order_id,
              pay_type: this.radio, //1 余额  2 货款  3 微信
              master_type: this.master_type //支付类型:1=公众号支付,2=小程序支付,3=手机网站支付,4=app支付,5=企业付款
            };
            this.payApi(query);
          }
        }
      }
    },
    closePsd() {
      this.showpsd = false;
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length == 6) {
        this.showpsd = false;
        let query = {
          order_id: this.order_id,
          pay_type: this.radio, //1 余额  2 货款  3 微信
          pay_password: this.value
        };
        this.payApi(query);
      }
    },
    // 支付接口
    payApi(query) {
      this.axios
        .post("/api/goods_order/pay", query)
        .then(data => {
          // alert(data.is_type); // 1为线下支付，2为微信支付, 3支付宝
          if (data.is_type == 1) {
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
          } else if (data.is_type == 2) {
            console.log(data.pay);
            console.log(JSON.parse(data.pay)); //参数
            // 判断是否是微信环境master_type 支付类型:1=公众号支付 3=手机网站支付
            if (this.master_type == 1) {
              this.onBridgeReady(JSON.parse(data.pay));
            } else if (this.master_type == 3) {
              this.$toast("现微信支付仅支持公众号内使用");
            }
          }
        })
        .catch(err => {
          if (err == "运费余额不足" || err == "余额不足" || err == "货款不足") {
            Dialog.confirm({
              message: err + "请去充值"
            })
              .then(() => {
                this.$router.push("/mypurse");
              })
              .catch(() => {});
          }
        });
    },
    // 微信环境微信支付
    onBridgeReady(pay) {
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: pay.appId, //公众号名称，由商户传入
          timeStamp: pay.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: pay.nonceStr, //随机串
          package: pay.package,
          signType: pay.signType, //微信签名方式
          paySign: pay.paySign //微信签名
        },
        res => {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            // alert("支付成功1111111111");
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
          } else {
            this.$toast("支付失败，请重新支付");
          }
        }
      );
    },
    topsd() {
      console.log();

      this.$router.push({
        path: "/payPsd",
        query: {
          mobile: this.tel
        }
      });
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  },
  mounted() {
    // 微信支付开关
    this.axios.post("/api/index/pay_status").then(data => {
      this.wechat_status = data.wechat_status;
    });
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