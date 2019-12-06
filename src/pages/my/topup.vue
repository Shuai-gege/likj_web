<template>
  <div class="topup">
    <navbar title="充值中心" navbar_right_name="记录" navbar_right_link="/chongzhilist"></navbar>
    <!-- <p class="shenqing">向品牌方申请</p> -->
    <van-cell-group>
      <van-field v-model="money" type="number" label="充值金额" placeholder="请输入金额" />
    </van-cell-group>
    <p style="margin-left:15px;">打款时间需与付款凭证上的时间一致</p>
    <!-- 充值冲到哪里 -->
    <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" />
    <van-cell :title="type" size="large" label="充值到" is-link @click="xuanze" />
    <!-- 用什么充值 -->
    <van-action-sheet v-model="show1" :actions="actions1" cancel-text="取消" @select="onSelect1" />
    <van-cell :title="type1" size="large" is-link @click="xuanze1" />
    <!-- 分割线 -->

    <!-- <van-cell-group>
      <van-field v-model="message" label="留言" type="textarea" placeholder="请输入留言" rows="2" />
    </van-cell-group>-->
    <van-cell v-if="num1 == 1&&!hasShangji" title="查看公司收款账户" is-link to="shoukuan" />
    <van-cell v-if="num1 == 1&&hasShangji" title="查看上级收款账户" is-link to="shangjishoukuan" />
    <div v-if="num1 == 1">
      <p style="margin-left:15px;">付款凭证</p>
      <div style="background:#fff;padding: 15px;" class="pingzheng flex_l">
        <!-- <van-uploader v-model="fileList" multiple :max-count="3" /> -->
        <van-uploader v-model="pay1" :max-count="1" :after-read="afterRead1" />
        <van-uploader v-model="pay2" :max-count="1" :after-read="afterRead2" />
        <van-uploader v-model="pay3" :max-count="1" :after-read="afterRead3" />
      </div>
    </div>
    <div style="padding:20px;margin-top:50px;">
      <van-button type="primary" size="large" color="#fc4c4c" @click="init">提交</van-button>
    </div>
  </div>
</template>
<script>
import navbar from "@/components/navbar";
import { upload } from "../../common/js/common";
export default {
  data() {
    return {
      show: false,
      show1: false,
      pay1: [], //支付凭证
      pay2: [], //支付凭证
      pay3: [], //支付凭证
      message: "", //留言
      time: "", //打款时间
      money: "", //充值金额
      actions: [{ name: "余额" }, { name: "货款" }, { name: "保证金" }], //充值到哪里
      actions1: [{ name: "线下付款" }], //充值方式
      type: "充值到余额/货款/保证金", //充值到哪里
      type1: "支付方式", //充值方式
      num: "", //把actions变成数字，1为余额，2为货款, 3保证金
      num1: "", //把actions1变成数字，1为线下支付，2为微信，3为支付宝
      payImg: [], //支付凭证
      hasShangji: false,
      master_type: "" //支付类型:1=公众号支付,2=小程序支付,3=手机网站支付,4=app支付,5=企业付款
      // wechat_status: "" //微信支付开关  1开启0关闭
    };
  },
  components: {
    navbar
  },
  mounted() {
    // 微信支付开关
    this.axios.post("/api/index/pay_status").then(data => {
      // this.wechat_status = data.wechat_status;
      if (data.wechat_status == 1) {
        this.actions1 = [{ name: "线下付款" }, { name: "微信支付" }];
      } else {
        this.actions1 = [{ name: "线下付款" }];
      }
    });
  },
  watch: {
    type1(newVal) {
      if (newVal == "线下付款") {
        if (localStorage.getItem("agent_id")) {
          this.hasShangji = true;
        }
      }
    }
  },
  methods: {
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      this.type = item.name;
      if (item.name == "余额") {
        this.num = 1;
      } else if (item.name == "货款") {
        this.num = 2;
      } else {
        this.num = 3;
      }
    },
    xuanze() {
      this.show = true;
    },
    onSelect1(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show1 = false;
      this.type1 = item.name;
      //   this.$toast(item.name);
      if (item.name == "线下付款") {
        this.num1 = "1";
      } else if (item.name == "微信支付") {
        this.num1 = "2";
      }
    },
    xuanze1() {
      this.show1 = true;
    },
    onCancel() {},
    //点击提交按钮
    init() {
      let arr = [this.img1, this.img2, this.img3];
      this.payImg = arr.filter(item => {
        return item;
      });
      if (!this.money.trim()) {
        this.$toast("请输入充值金额");
      } else if (!this.num) {
        this.$toast("请选择充值类型");
      } else if (!this.num1) {
        this.$toast("请选择充值方式");
      } else if (this.num1 == 1 && !this.img1 && !this.img2 && !this.img3) {
        this.$toast("请上传支付凭证");
      } else {
        console.log(this.num1); //1为线下支付，2为微信支付
        let query; //支付参数
        if (this.num1 == 2) {
          //微信 master_type 支付类型:1=公众号支付,2=小程序支付,3=手机网站支付,4=app支付,5=企业付款
          //判断浏览器是否是微信浏览器
          var ua = navigator.userAgent.toLowerCase();
          if (ua.match(/MicroMessenger/i) == "micromessenger") {
            // alert("微信环境，走微信登录");
            this.master_type = 1;
          } else {
            this.master_type = 3;
          }
          query = {
            amount: this.money,
            recharge_way: this.num,
            recharge_type: this.num1,
            master_type: this.master_type
          };
        } else if (this.num1 == 1) {
          // 线下支付
          query = {
            amount: this.money,
            recharge_way: this.num,
            recharge_type: this.num1,
            payment_voucher: this.payImg.join(",")
          };
        }
        this.axios
          .post("/api/property_administer/sbRecharge", query)
          .then(data => {
            // alert(data.is_type); //1为线下支付，2为微信支付, 3支付宝
            if (data.is_type == 1) {
              this.$toast("已提交申请，请等待审核");
              setTimeout(() => {
                this.$router.go(-1);
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
          });
      }
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
            this.$toast("充值成功");
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          } else {
            this.$toast("支付失败，请重新支付");
          }
        }
      );
    },
    afterRead1() {
      upload(this.pay1[0].content, this.pay1[0].file.name).then(data => {
        this.img1 = data.url;
        console.log(this.img1);
      });
    },
    afterRead2() {
      upload(this.pay2[0].content, this.pay2[0].file.name).then(data => {
        this.img2 = data.url;
      });
    },
    afterRead3() {
      upload(this.pay3[0].content, this.pay3[0].file.name).then(data => {
        this.img3 = data.url;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.topup {
  font-size: 14px;
  background: #f5f5f5;
  min-height: 100vh;
  padding-top: 44px;
  .shenqing {
    padding: 15px;
    background: #fff;
    color: #333;
    font-size: 15px;
  }
  .van-cell {
    margin: 20px 0 10px 0;
  }
}
</style>