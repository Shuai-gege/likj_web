<template>
  <div class="topup">
    <navbar title="充值中心"></navbar>
    <!-- <p class="shenqing">向品牌方申请</p> -->
    <van-cell-group>
      <van-field v-model="money" type="text" label="充值金额" placeholder="请输入金额" />
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
    <div v-if="num1 == 1">
      <p style="margin-left:15px;">付款凭证</p>
      <div style="background:#fff;padding: 15px;" class="pingzheng">
        <van-uploader v-model="fileList" multiple :max-count="3" />
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
      fileList: [],
      message: "", //留言
      time: "", //打款时间
      money: "", //充值金额
      actions: [{ name: "余额" }, { name: "货款" }], //充值到哪里
      actions1: [{ name: "线下付款" }], //充值方式
      type: "充值到余额/货款", //充值到哪里
      type1: "支付方式", //充值方式
      num: "", //把actions变成数字，1为余额，2为货款
      num1: "", //把actions1变成数字，1为线下支付，2为微信，3为支付宝
      payImg: [] //支付凭证
    };
  },
  components: {
    navbar
  },

  methods: {
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      this.type = item.name;
      if (item.name == "余额") {
        this.num = 1;
      } else {
        this.num = 2;
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
      } else if (item.name == "微信") {
        this.num1 = "2";
      } else {
        this.num1 = "3";
      }
    },
    xuanze1() {
      this.show1 = true;
    },
    onCancel() {},
    //点击提交按钮
    init() {
      if (!this.money.trim()) {
        this.$toast("请输入充值金额");
      } else if (!this.num) {
        this.$toast("请选择充值类型");
      } else if (!this.num1) {
        this.$toast("请选择充值方式");
      } else if (this.fileList.length == 0) {
        this.$toast("请上传支付凭证");
      } else {
        console.log(this.fileList);
        // 上传图片
        this.fileList.forEach(item => {
          upload(item.content, item.file.name)
            .then(data => {
              this.payImg.push(data.url);
            })
            .then(() => {
              if (this.payImg.length == this.fileList.length) {
                this.axios
                  .post("/api/property_administer/sbRecharge", {
                    amount: this.money,
                    recharge_way: this.num,
                    recharge_type: this.num1,
                    payment_voucher: this.payImg.join(",")
                  })
                  .then(data => {
                    this.$toast("充值成功");
                    setTimeout(() => {
                      this.$router.push("/mypurse");
                    }, 1000);
                  });
              }
            });
        });
      }
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