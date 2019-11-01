<template>
  <div class="shoukuan">
    <!-- 头部公共搜索框 -->
    <tabbar title="余额转货款"></tabbar>
    <div class="con">
      <van-cell-group>
        <van-field v-model="value" label="转换货款为" placeholder="请输入转换金额" @input="tishi" />
      </van-cell-group>
      <p class="zhanshi">
        现在可用余额：
        <i>￥{{num}}</i>
      </p>
      <div class="btn">
        <van-button type="primary" size="large" @click="init" color="#fc4c4c">确认转换</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import tabbar from "../../components/navbar";
export default {
  data() {
    return {
      type: "", //代理级别
      value: "", //要转货款的值
      num: "" //接受余额
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.num = this.$route.query.num;
  },
  methods: {
    init() {
      if (!this.value) {
        this.$toast("请输入转换金额");
      } else {
        this.axios
          .post("/api/property_administer/balanceConvert", {
            money: this.value
          })
          .then(data => {
            this.$toast("转换成功");
            let thas = this;
            setTimeout(() => {
              thas.num = thas.num - thas.value;
            }, 500);
          });
      }
    },
    tishi() {
      if (parseFloat(this.value) > parseFloat(this.num)) {
        this.$toast("余额不足");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.shoukuan {
  padding-top: 44px;

  .con {
    margin-top: -1px;
    .zhanshi {
      padding: 5px 15px;
      font-size: 14px;
      i {
        color: #fc4c4c;
      }
    }
    .btn {
      padding: 50px 15px;
    }
  }
}
</style>
