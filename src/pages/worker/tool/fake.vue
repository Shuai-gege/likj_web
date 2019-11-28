<template>
  <div class="fake">
    <!-- 头部公共搜索框 -->
    <tabbar title="防伪查询"></tabbar>
    <div class="title">
      <p>防伪查询</p>
      <van-cell-group>
        <van-field
          v-model="value"
          placeholder="请输入防伪码"
          right-icon="scan"
          clearable
          @click-right-icon="sao"
        />
      </van-cell-group>
    </div>
    <div class="con" v-show="show">
      <div class="flex_l">
        <img :src="initdata.size_image" alt />
        <div class="name">
          <p style="margin-bottom:20px;">{{initdata.name}}</p>
          <p>
            此为
            <i>官方正品</i>
          </p>
        </div>
      </div>
      <!-- 分割 -->
      <p class="num">
        查询次数：
        <i>{{num.query_num}}</i>
        次
      </p>
      <p class="num">
        价钱：
        <i>￥{{initdata.price}}</i>
      </p>
      <p class="num">规格：{{initdata.three_name}}</p>
      <p class="num">剩余数量：{{initdata.stock}}</p>
    </div>
    <!-- 按钮 -->
    <van-button
      type="primary"
      size="large"
      @click="submit"
      color="linear-gradient(to right bottom, #ffb305, rgb(123, 46, 46))"
    >查询</van-button>
  </div>
</template>
<script>
import tabbar from "../../../components/navbar";
import { scan } from "../../../common/js/common";
export default {
  data() {
    return {
      value: "", //输入框
      show: false,
      num: {}, //查询次数
      initdata: {} //查询商品信息
    };
  },
  components: {
    tabbar
  },
  mounted() {},
  methods: {
    submit() {
      if (!this.value) {
        this.$toast("请输入防伪码");
      } else {
        this.axios
          .post("/api/anticf/queryCode", { code: this.value })
          .then(data => {
            this.num = data;
            this.initdata = data.goods_info;
            this.show = true;
          });
      }
    },
    sao() {
      scan().then(data => {
        this.value = data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.fake {
  padding-top: 44px;
  font-size: 14px;
  color: #333;
  i {
    color: #fc4c4c;
  }
  .title {
    width: 100%;
    height: 160px;
    background: url("../../../image/bgt2.png");
    padding: 30px 15px;
    /deep/.van-icon-scan:before {
      font-size: 20px;
    }
    p {
      text-align: center;
      padding-bottom: 20px;
      font-size: 20px;
      color: #ffb305;
    }
  }
  .con {
    padding: 10px;
    img {
      width: 80px;
      height: 80px;
      border-radius: 10px;
    }
    .name {
      margin-left: 15px;
    }
    .num {
      margin: 20px 0;
      font-size: 16px;
    }
  }
  .van-button--large {
    width: 96%;
    margin-left: 2%;
    position: absolute;
    bottom: 10px;
  }
}
</style>
