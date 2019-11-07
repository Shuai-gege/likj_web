<template>
  <div class="tixian">
    <navbar title="提现" navbar_right_name="记录" navbar_right_link="/tixianlist"></navbar>
    <!-- 选择提现到哪里 -->
    <div class="xuanze">
      <!-- 提现账户 -->
      <van-cell :title="type" size="large" :label="account" is-link @click="xuanze" />
      <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        @select="onSelect"
        @cancel="onCancel"
      />
      <!-- 选择提现方式 -->
      <van-cell :title="type1" size="large" is-link @click="xuanze1" />
      <div>
        <van-action-sheet
          v-model="show1"
          :actions="actions1"
          cancel-text="取消"
          @select="onSelect1"
          @cancel="onCancel1"
        />
      </div>
      <!-- 提现金额 -->
      <!-- <p style="padding-left:22px;">提现金额</p> -->
      <van-cell-group>
        <!-- <p style="padding-left:22px;">提现金额</p> -->
        <van-field
          style="padding-left:20px;height:80px;line-height:60px;font-size:18px;"
          placeholder="请输入提现金额"
          left-icon="gold-coin-o"
          v-model="price"
          @input="getPrice"
        />
      </van-cell-group>
      <p
        style="padding-left:12px;margin-top:5px;color:#fc4c4c;"
        v-if="this.type1!='请选择提现方式'"
      >可提现{{type1=='余额提现'?'余额':'奖金'}}：{{type1=='余额提现'?money:bonus}}</p>
      <!-- 按钮 -->
      <van-button type="danger" size="large" style="margin-top:100px;" @click="tixian">提现</van-button>
    </div>
  </div>
</template>
<script>
import navbar from "@/components/navbar";
import { Dialog } from "vant";
export default {
  data() {
    return {
      show: false,
      show1: false,
      actions: [], //打款方式
      actions1: [], //提现类型
      type: "请选择提现账户", //提现账户
      initdata1: {}, //有关账户信息
      account: "", //账户号

      type1: "请选择提现方式", //提现方式：余额  奖金
      money: "", //可使用余额
      bonus: "", //奖金

      price: "" //提现金额
    };
  },
  components: {
    navbar
  },
  mounted() {
    this.init1();
    this.init2();
  },
  methods: {
    // 获取收款账户
    init1() {
      this.axios
        .post("/api/property_administer/personalAccount", {
          type: 2
        })
        .then(data => {
          this.initdata1 = data;
          if (data.bank_account_status == 1) {
            this.actions.push({ name: "银行卡" });
          }
          if (data.wx_account_status == 1) {
            this.actions.push({ name: "微信" });
          }
          if (data.zfb_account_status == 1) {
            this.actions.push({ name: "支付宝" });
          }
          if (
            data.bank_account_status != 1 &&
            data.wx_account_status != 1 &&
            data.zfb_account_status != 1
          ) {
            Dialog.confirm({
              title: "设置个人收款账户",
              message: "设置个人收款账户后，才可以转账"
            })
              .then(() => {
                this.$router.push("/myaccount");
              })
              .catch(() => {
                this.$router.go(-1);
              });
          }
        });
    },
    // 获取余额和奖金
    init2() {
      this.axios.post("/api/user/index").then(data => {
        if (data.money == 0) {
          this.actions1.push({
            name: "余额提现",
            disabled: true
          });
        } else {
          this.actions1.push({
            name: "余额提现"
          });
        }
        if (data.bonus == 0) {
          this.actions1.push({
            name: "奖金提现",
            disabled: true
          });
        } else {
          this.actions1.push({
            name: "奖金提现"
          });
        }
        this.money = data.money; //余额
        this.bonus = data.bonus; //奖金
      });
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      this.type = item.name;
      if (item.name == "银行卡") {
        this.account = this.initdata1.bank_account;
      } else if (item.name == "微信") {
        this.account = this.initdata1.wx_account;
      } else {
        this.account = this.initdata1.zfb_account;
      }
    },
    onCancel() {},
    onSelect1(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show1 = false;
      this.type1 = item.name;
      //   this.$toast(item.name);
    },
    onCancel1() {},
    //点击选择提现账户
    xuanze() {
      this.show = true;
    },
    // 选择提现方式
    xuanze1() {
      this.show1 = true;
    },
    // 点击提现按钮
    tixian() {
      if (this.type == "请选择提现账户") {
        this.$toast("请选择提现账户");
      } else if (this.type1 == "请选择提现方式") {
        this.$toast("请选择提现方式");
      } else if (!this.price.trim()) {
        this.$toast("请输入提现金额");
      } else {
        let type;
        if (this.type == "银行卡") {
          type = 1;
        } else if (this.type == "微信") {
          type = 2;
        } else {
          type = 3;
        }
        console.log(this.type1);

        this.axios
          .post("/api/property_administer/sbCash", {
            currency_type: this.type1 == "余额提现" ? 1 : 2, //提现方式
            pay_type: type, //提现账户
            money: this.price
          })
          .then(data => {
            this.$toast("提现成功");
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          });
      }
    },
    // 判断提现金额
    getPrice() {
      console.log(this.price);
      if (this.type1 == "余额提现") {
        console.log(this.money);
        if (parseFloat(this.price) > parseFloat(this.money)) {
          this.$toast("提现金额不能超过可提现金额");
        }
      } else {
        if (parseFloat(this.price) > parseFloat(this.bonus)) {
          this.$toast("提现金额不能超过可提现金额");
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.tixian {
  .xuanze {
    margin-top: 55px;
  }
  /deep/ i {
    font-size: 20px;
  }
}
</style>