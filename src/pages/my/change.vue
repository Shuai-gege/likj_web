<template>
  <div class="shoukuan">
    <!-- 头部公共搜索框 -->
    <tabbar title="余额转货款"></tabbar>
    <div class="con">
      <van-cell-group>
        <van-field v-model="value" label="转换货款为" placeholder="请输入转换金额" @input="tishi" />
      </van-cell-group>
      <!-- 充值到哪里 -->
      <van-cell title="余额转货款/保证金" is-link :value="name" @click="tap" />
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
      <!--  -->
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
      num: "", //接受余额
      show: false,
      radio: "", //1货款，2保证金
      actions: [{ name: "货款" }, { name: "保证金" }],
      name: "" //货款、保证金
    };
  },
  components: {
    tabbar
  },
  mounted() {
    this.num = this.$route.query.num;
  },
  methods: {
    onSelect(item) {
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      this.show = false;
      this.name = item.name;

      if (item.name == "货款") {
        this.radio = "1";
      }
      if (item.name == "保证金") {
        this.radio = "2";
      }
    },
    init() {
      if (!this.value) {
        this.$toast("请输入转换金额");
      } else if (!this.name) {
        this.$toast("请选择转换类型");
      } else {
        this.axios
          .post("/api/property_administer/balanceConvert", {
            money: this.value,
            type: this.radio
          })
          .then(data => {
            this.$toast("转换成功");
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          });
      }
    },
    tishi() {
      if (parseFloat(this.value) > parseFloat(this.num)) {
        this.$toast("余额不足");
      }
    },
    tap() {
      this.show = true;
    }
  }
};
</script>

<style lang="less" scoped>
.shoukuan {
  padding-top: 44px;

  .con {
    margin-top: -1px;
    .flex {
      padding: 0 15px;
    }
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
