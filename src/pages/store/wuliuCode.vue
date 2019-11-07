<template>
  <div class="wuliuCode">
    <!-- 头部公共搜索框 -->
    <tabbar title="物流信息"></tabbar>
    <div class="con">
      <van-cell-group>
        <van-field
          v-model="username"
          required
          clearable
          label="物流单号"
          placeholder="请输入物流单号"
          right-icon="scan"
          @click-right-icon="scan"
        />

        <van-field
          v-model="username1"
          required
          clearable
          disabled
          label="物流公司"
          @click="wuliu"
          placeholder="请输入物流公司"
        />
        <van-field
          v-model="message"
          rows="2"
          autosize
          label="留言"
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
      </van-cell-group>
      <van-button class="btn" type="danger" size="large" @click="submit">确定</van-button>
      <van-popup v-model="show" round position="bottom" :style="{ height: '50%' }">
        <van-picker
          show-toolbar
          title="选择物流公司"
          :columns="columns"
          @cancel="onCancel"
          @confirm="onConfirm"
        />
      </van-popup>
    </div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
export default {
  data() {
    return {
      order_id: "", //订单id
      username: "", //物流单号
      username1: "", //物流公司
      message: "", //留言

      show: false, //物流弹窗
      columns: [], //物流公司合集
      initdata: [], //物流接口
      companyCode: "" //选择的物流公司的code
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.order_id = this.$route.query.order_id;
    this.init();
  },
  methods: {
    // 获取物流公司
    init() {
      this.axios.post("/api/express/getExpress").then(data => {
        data.forEach(item => {
          this.columns.push(item.company);
        });
        this.initdata = data;
      });
    },
    scan() {
      this.axios
        .post("/api/we_chat/getJSSDK", {
          url: location.href
        })
        .then(data => {
          let _this = this;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: ["scanQRCode"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(function() {
            // 9.1.2 扫描二维码并返回结果
            wx.scanQRCode({
              needResult: 1,
              desc: "scanQRCode desc",
              success: function(res) {
                console.log(666666666666, res);
                //扫码后获取结果参数赋值给Input
                _this.username = res.resultStr.split(",")[1];
                _this.axios
                  .post("/api/express/getExpressCompany", {
                    code: _this.username
                  })
                  .then(data => {
                    _this.username1 = data.company;
                    _this.companyCode = data.code;
                  });
              }
            });
          });
          //初始化jsapi接口 状态
          wx.error(function(res) {
            alert("调用微信jsapi返回的状态:" + res.errMsg);
          });
        });
    },
    wuliu() {
      this.show = true;
    },
    onConfirm(value, index) {
      this.show = false;
      this.username1 = value;
      this.companyCode = this.initdata[index].code;
    },
    onCancel() {
      this.show = false;
    },
    submit() {
      if (!this.username) {
        this.$toast("请输入物流单号");
      } else if (!this.username1) {
        this.$toast("请选择物流公司");
      } else {
        this.axios
          .post("/api/goods_order/deliveryGoods", {
            express_no: this.username,
            express_code: this.companyCode,
            remark: this.message,
            order_id: this.order_id
          })
          .then(data => {
            this.$toast("发货成功");
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.wuliuCode {
  min-height: 100vh;
  padding-top: 44px;
  .con {
    margin-top: -1px;
    .btn {
      display: block;
      margin: 100px auto;
    }
  }
}
</style>
