<template>
  <div class="box">
    <!-- 头部 -->
    <van-nav-bar title="工作台" left-text="返回" left-arrow @click-left="onClickLeft" />

    <van-row>
      <van-col span="22" offset="1">
        <!-- 商品卡 -->
        <van-checkbox v-model="checked" checked-color="#07c160"></van-checkbox>
        <van-radio-group v-model="radio">
          <van-radio name="1" checked-color="#07c160">
            <van-card
              num="2"
              price="2.00"
              desc="描述信息"
              title="商品标题"
              thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
            >
              <div slot="tags">
                <van-tag plain type="danger">{{mashu}}</van-tag>
                <van-tag plain type="danger">{{name}}</van-tag>
                <van-stepper v-model="value" />
              </div>
              <div slot="footer">
                <van-button size="mini">编辑</van-button>
                <p class="shop">某某店铺 ></p>
              </div>
            </van-card>
          </van-radio>
        </van-radio-group>
      </van-col>
    </van-row>

    <!-- 提交订单 -->
    <p>我是购物车</p>
    <van-submit-bar :price="0" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
      <span slot="tip">
        你的收货地址不支持同城送,
        <span>修改地址</span>
      </span>
    </van-submit-bar>
  </div>
</template>
<script>
import Vue from "vue";
import {
  NavBar,
  Card,
  SubmitBar,
  Checkbox,
  CheckboxGroup,
  Stepper
} from "vant";
Vue.use(NavBar)
  .use(Card)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(SubmitBar)
  .use(Stepper);
export default {
  data() {
    return {
      mashu: "翠花",
      name: "的阿迪王时尚短袖",
      checked: false,
      radio: "0",
      value: 1
    };
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="stylus" scoped>
.van-card {
  background: rgba(85, 255, 255, 0.3);
  border-radius: 20px;
}

.shop {
  border-top: 1px solid #ccc;
  height: 20px;
  line-height: 20px;
}

.xuan {
  position: absolute;
  left: -7.3rem;
  top: 123px;
}
</style>