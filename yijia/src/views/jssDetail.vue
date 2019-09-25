<template>
  <div class="box">
    <!-- 头部 -->
    <van-nav-bar title="详情页" left-text="返回" left-arrow @click-left="onClickLeft" />

    <!-- 中间部分 -->
    <van-row>
      <van-col span="24">
        <van-swipe @change="onChange" height="251">
          <van-swipe-item class="Show1">1</van-swipe-item>
          <van-swipe-item class="Show1">2</van-swipe-item>
          <van-swipe-item class="Show1">3</van-swipe-item>
          <van-swipe-item class="Show1">4</van-swipe-item>
          <div class="custom-indicator" slot="indicator">{{ current + 1 }}/4</div>
        </van-swipe>
      </van-col>
      <van-col span="24">
        <div>
          <b class="article">翠花的无敌阿迪王</b>
          <p>贴身不扎皮肤，纯棉</p>
        </div>
      </van-col>
      <van-col span="24">
        <div style="margin:10px 0">
          <span style="font-size:18px">￥15.84</span>
          <van-tag round type="warning">标签</van-tag>
          <p>
            价格
            <s>￥16</s>
          </p>
        </div>
      </van-col>
    </van-row>
    <div class="DHL">
      <p>快递：包邮</p>
      <p>已售：3654份</p>
    </div>
    <!-- 商品详情展示 -->
    <div class="datail">
      <h1>| 商品详情</h1>
    </div>

    <!-- 选择规格 -->
    <van-action-sheet v-model="show" title="标题">
      <div class="head">
        <img src="../image/login.gif" alt />
        <div class="Font">
          <p>
            ￥
            <b>59.00</b>
          </p>
          <p>库存:1000套</p>
        </div>
      </div>
      <!-- 尺码 -->
      <div class="size">
        <p>尺码</p>
        <div class="flex_l">
          <span>S</span>
          <span>S</span>
          <span>S</span>
          <span>S</span>
        </div>
      </div>
      <van-divider />
      <!-- 颜色 -->
      <div class="colour">
        <p>主要颜色</p>
        <div class="flex_l">
          <span class="flex_l">
            <img src="../image/login.gif" alt />
            <h6>白色</h6>
          </span>
          <span class="flex_l">
            <img src="../image/login.gif" alt />
            <h6>白色</h6>
          </span>
          <span class="flex_l">
            <img src="../image/login.gif" alt />
            <h6>白色</h6>
          </span>
        </div>
      </div>
      <van-divider />
      <!-- 步进器 -->
      <div class="flex num">
        <p>购买数量</p>
        <van-stepper v-model="value" />
      </div>

      <!-- 按钮 -->
      <van-button type="primary" color="linear-gradient(to right, hotpink, #eb5959)" size="large">确定</van-button>
    </van-action-sheet>
    <!-- 尾部 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" @click="text" />
    </van-goods-action>
  </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
import {
  NavBar,
  Stepper,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Row,
  Col,
  Swipe,
  SwipeItem,
  Tag,
  Icon,
  Popup,
  ActionSheet,
  Divider
} from "vant";
Vue.use(NavBar)
  .use(Icon)
  .use(Row)
  .use(Col)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Swipe)
  .use(Tag)
  .use(SwipeItem)
  .use(Popup)
  .use(ActionSheet)
  .use(Stepper)
  .use(Divider);
export default {
  data() {
    return {
      current: 0,
      show: false,
      actions: [
        { name: "选项", color: "#07c160" },
        { loading: true },
        { name: "禁用选项", disabled: true }
      ],
      show: false,
      value: 1
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onChange(index) {
      this.current = index;
    },
    tap() {
      this.show = true;
    },
    text() {
      this.show = true;
    }
  }
};
</script>
<style lang="stylus" scoped>
.Show1 {
  height: 18.75rem;
  background: #FFA519;
}

.custom-indicator {
  background: rgba(28, 28, 28, 0.5);
  width: 2.5rem;
  text-align: center;
  border-radius: 0.9375rem;
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
}

.article {
  font-size: 20px;
}

.yard {
  margin: 1.25rem;

  img {
    width: 6.25rem;
    height: 6.25rem;
    display: inline;
  }
}

.DHL {
  display: flex;
  justify-content: space-around;
}

.datail {
  margin-left: '10px';

  h1 {
    font-size: 1.25rem;
  }
}

.head {
  margin: 0.625rem 1.25rem;
  display: flex;

  img {
    width: 8rem;
    height: 8rem;
    border: 1px solid #cecece;
  }

  .Font {
    margin: 20px;

    p:nth-of-type(1) {
      font-size: 1.3rem;
      color: #f00;
      margin-bottom: 2rem;

      b {
        font-size: 1.5625rem;
      }
    }
  }
}

.size {
  margin: 0.625rem 1.25rem;

  P {
    font-size: 1.25rem;
    margin-bottom: 10px;
  }

  span {
    display: block;
    margin-right: 20px;
    padding: 0.3125rem 1.6rem;
    background: #eee5e5;
    border-radius: 10px;
  }
}

.colour {
  margin: 0.625rem 1.25rem;

  p {
    font-size: 1.25rem;
    margin-bottom: 10px;
  }

  h6 {
    display: inline;
  }

  img {
    margin-right: 5px;
    width: 20px;
    height: 20px;
    display: inline;
  }

  span {
    height: 30px;
    margin-right: 20px;
    padding: 10px;
    background: #eee5e5;
    border-radius: 10px;
  }
}

.num {
  margin: 1rem 0.625rem;
  margin-bottom: 6.25rem;
}
</style>