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
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="send-gift" to="/jsszhongjian">首页</van-tabbar-item>
      <van-tabbar-item name="cluster" icon="hot" to="jssHot">热卖商品</van-tabbar-item>
      <van-tabbar-item name="friends" icon="shopping-cart" to="jssCary">购物车</van-tabbar-item>
      <van-tabbar-item name="setting" icon="smile" to="jssMy">我的</van-tabbar-item>
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
