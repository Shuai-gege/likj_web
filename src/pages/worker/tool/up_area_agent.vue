<template>
  <div class="up_area_agent">
    <!-- 头部公共搜索框 -->
    <tabbar title="升级区域代理"></tabbar>
    <div class="con">
      <div class="title">欢迎升级 {{initdata.title}}</div>
      <div class="item flex_l">
        <div class="left">入驻金额：</div>
        <div class="right">{{initdata.open_money}}</div>
      </div>
      <div class="item flex_l">
        <div class="left">业绩奖：</div>
        <div class="right">{{initdata.open_money}}</div>
      </div>
      <div class="item flex_l">
        <div class="left">业绩奖说明：</div>
        <div class="right">{{initdata.yj_info}}</div>
      </div>
      <div class="item flex_l">
        <div class="left">可申请等级：</div>
        <div class="right">{{initdata.agent_name}}</div>
      </div>
      <van-cell title="请选择升级区域" :value="area" is-link @click="show=true" />
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-area
          :area-list="areaList"
          :columns-num="initdata.type"
          title="选择区域"
          @confirm="getArea"
        />
      </van-popup>
      <van-button type="danger" size="large" @click="submit">立即申请</van-button>
    </div>
    <div class="pay">
      <!-- 支付方式选择 -->
      <van-popup
        v-model="showpay"
        position="bottom"
        round
        :style="{ height: '40%' }"
        @close="close"
      >
        <p class="center title">选择支付方式</p>
        <div class="price center">{{price}} 元</div>
        <van-radio-group v-model="radio">
          <van-radio class="center" name="1" checked-color="rgb(240, 64, 64)">余额支付</van-radio>
          <!-- <van-radio class="center" name="4" checked-color="rgb(240, 64, 64)">线下支付</van-radio> -->
          <!-- <van-radio class="center" name="3" checked-color="rgb(240, 64, 64)">微信支付</van-radio> -->
        </van-radio-group>
        <van-button class="button" type="danger" @click="gopay">确定</van-button>
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
  </div>
</template>
<script>
import tabbar from "../../../components/navbar";
import areaList from "../../../common/js/newArea";
export default {
  data() {
    return {
      id: "",
      initdata: {},
      show: false,
      areaList,
      area_info: [], //特殊地区，特殊的价格
      area_code: "", //所选地区最小编码
      area: "", //所选地区
      price: null, //升级费用
      showpay: false,
      showpsd: false, //密码弹窗
      value: "", // 密码
      showKeyboard: false, //数字键盘
      radio: "" //支付方式
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.id = this.$route.query.id;
    this.init();
  },
  methods: {
    init() {
      this.axios
        .post("/api/agent_area/getAreaInfo", {
          id: this.id
        })
        .then(data => {
          this.initdata = data;
          this.area_info = data.agent_area_info;
        });
    },
    // 选择区域
    getArea(value) {
      this.show = false;
      this.price = null;
      let aread = [];
      value.forEach(item => {
        aread.push(item.name);
      });
      this.area = aread.join(" ");
      this.area_code = value[value.length - 1].code;
      this.area_info.forEach(item => {
        if (item.code == this.area_code) {
          this.price = item.open_money;
        }
      });
      this.price = this.price ? this.price : this.initdata.open_money;
    },
    submit() {
      if (!this.area) {
        this.$toast("请选择区域");
      } else {
        this.showpay = true;
      }
    },
    // 选择支付方式
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
              this.apply();
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
        this.close();
      }
    },
    close() {
      this.showpay = false;
    },
    closePsd() {
      this.showpsd = false;
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length == 6) {
        this.showpsd = false;
        this.apply(this.value);
      }
    },
    // 申请接口
    apply(psw) {
      this.axios
        .post("/api/agent_area/areaAgentApply", {
          id: this.id,
          area_code: this.area_code,
          pay_password: psw
        })
        .then(data => {
          this.$toast("申请成功，请耐心等待审核");
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        });
    },
    topsd() {
      this.$router.push("/payPsd");
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  }
};
</script>

<style lang="less" scoped>
.up_area_agent {
  padding-top: 44px;
  padding-bottom: 60px;
  font-size: 14px;
  color: #333;
  .con {
    margin-top: -1px;
    .title {
      height: 50px;
      color: rgb(248, 153, 29);
      text-align: center;
      font-weight: 700;
      font-size: 16px;
      line-height: 50px;
    }
    .item {
      padding: 10px 10px 10px 15px;
      border-bottom: 1px solid #f5f6f7;
      .left {
        width: 90px;
      }
      .right {
        flex: 1;
      }
    }
    /deep/.van-cell__title {
      width: auto;
    }
    /deep/.van-popup .van-icon {
      color: rgb(245, 34, 6);
      z-index: 999;
      font-size: 22px;
    }
    .van-button {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
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
    .van-radio {
      border-bottom: 1px solid #f5f5f5;
      padding: 15px;
    }
    .button {
      width: 90%;
      margin: 30px auto 0;
      display: block;
    }
    .van-password-input__info {
      color: rgb(248, 55, 55);
    }
  }
}
</style>
