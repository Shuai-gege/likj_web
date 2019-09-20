<template>
  <div class="box">
    <!-- 搜索框
    <form action="/" class="SouSuo">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        background="#90d7ec"
        shape="round"
      />
    </form>-->
    <router-view></router-view>
    <!-- 底部tap -->
    <van-tabbar v-model="active" active-color="#FF9988">
      <van-tabbar-item name="home" icon="send-gift" to="/jsszhongjian" @click="tap()">首页</van-tabbar-item>
      <van-tabbar-item name="bench" icon="graphic" to="/jssbench" @click="tap1()">工作台</van-tabbar-item>
      <van-tabbar-item name="cluster" icon="hot" to="jssHot" @click="tap2()">热卖商品</van-tabbar-item>
      <van-tabbar-item name="friends" icon="shopping-cart" to="jssCary" @click="tap3()">购物车</van-tabbar-item>
      <van-tabbar-item name="setting" icon="smile" to="jssMy" @click="tap4()">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Popup,
  Button,
  Swipe,
  SwipeItem,
  Search,
  Grid,
  GridItem,
  Divider,
  PullRefresh,
  Toast,
  Tabbar,
  TabbarItem,
  List,
  Tab,
  Tabs,
  Card
} from "vant";
Vue.use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(Search)
  .use(Grid)
  .use(GridItem)
  .use(Divider)
  .use(PullRefresh)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(List)
  .use(Tab)
  .use(Tabs)
  .use(Card)
  .use(Popup);
export default {
  name: "Index",
  data() {
    return {
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
      active: "home"
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    tap() {
      var Home = document.getElementsByClassName("van-tabbar-item__icon");
      Home[0].style.fontSize = 25 + "px";
      Home[1].style.fontSize = 18 + "px";
      Home[2].style.fontSize = 18 + "px";
      Home[3].style.fontSize = 18 + "px";
      Home[4].style.fontSize = 18 + "px";
    },
    tap1() {
      var Home = document.getElementsByClassName("van-tabbar-item__icon");
      Home[1].style.fontSize = 25 + "px";
      Home[0].style.fontSize = 18 + "px";
      Home[2].style.fontSize = 18 + "px";
      Home[3].style.fontSize = 18 + "px";
      Home[4].style.fontSize = 18 + "px";
    },
    tap2() {
      var Home = document.getElementsByClassName("van-tabbar-item__icon");
      Home[2].style.fontSize = 25 + "px";
      Home[1].style.fontSize = 18 + "px";
      Home[0].style.fontSize = 18 + "px";
      Home[3].style.fontSize = 18 + "px";
      Home[4].style.fontSize = 18 + "px";
    },
    tap3() {
      var Home = document.getElementsByClassName("van-tabbar-item__icon");
      Home[3].style.fontSize = 25 + "px";
      Home[1].style.fontSize = 18 + "px";
      Home[2].style.fontSize = 18 + "px";
      Home[0].style.fontSize = 18 + "px";
      Home[4].style.fontSize = 18 + "px";
    },
    tap4() {
      var Home = document.getElementsByClassName("van-tabbar-item__icon");
      Home[4].style.fontSize = 25 + "px";
      Home[1].style.fontSize = 18 + "px";
      Home[2].style.fontSize = 18 + "px";
      Home[3].style.fontSize = 18 + "px";
      Home[0].style.fontSize = 18 + "px";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42c2a2;
}

.van-tabbar-item__text {
  font-size: 12px;
}
.van-search {
  position: fixed;
  width: 100%;
  z-index: 100;
}
.Di {
  position: fixed;
  z-index: 100;
  width: 100%;
}
</style>
