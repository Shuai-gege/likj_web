<template>
  <div class="box">
    <!-- 搜索框 -->
    <form action="/" class="SouSuo">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        background="#77ac98"
        shape="round"
      />
    </form>
    <div class="Center">
      <!-- 下拉刷新 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <!-- 轮播图 -->
        <van-swipe
          :autoplay="3000"
          indicator-color="white"
          height="150"
          class="Lunbo"
          style="border-radius:15px"
        >
          <van-swipe-item class="lun">1</van-swipe-item>
          <van-swipe-item class="lun">2</van-swipe-item>
          <van-swipe-item class="lun">3</van-swipe-item>
          <van-swipe-item class="lun">4</van-swipe-item>
        </van-swipe>
        <!-- 分割线 -->
        <van-divider>往下看</van-divider>
        <!-- 分类 -->
        <van-grid :gutter="10" style="border-radius:15px">
          <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="这是啥" />
        </van-grid>
        <!-- 引入列表 -->

        <!-- tap商品 -->
        <van-tabs v-model="active" animated>
          <van-tab title="每日推荐">
            <van-card
              num="2"
              price="2.00"
              desc="描述信息"
              title="商品标题"
              thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
            >
              <div slot="tags">
                <van-tag plain type="danger" class="Zi">标签</van-tag>
                <van-tag plain type="danger" class="Zi">标签</van-tag>
              </div>
              <div slot="footer">
                <van-button size="mini">按钮</van-button>
                <van-button size="mini">按钮</van-button>
              </div>
            </van-card>
          </van-tab>
          <van-tab title="每日精选">
            <van-card
              num="2"
              price="2.00"
              desc="描述信息"
              title="商品标题"
              thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
            >
              <div slot="tags">
                <van-tag plain type="danger" class="Zi">标签</van-tag>
                <van-tag plain type="danger" class="Zi">标签</van-tag>
              </div>
              <div slot="footer">
                <van-button size="mini">按钮</van-button>
                <van-button size="mini">按钮</van-button>
              </div>
            </van-card>
          </van-tab>
        </van-tabs>
      </van-pull-refresh>
    </div>
    <!-- 底部tap -->
    <van-tabbar v-model="active" class="Di">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search" to="../views/jssHome.vue">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import {
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
  .use(Card);
export default {
  name: "Index",
  data() {
    return {
      isLoading: false,
      list: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast("好看吗？");
        this.isLoading = false;
      }, 500);
    },

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
.lun {
  background: rgb(39, 158, 179);
}
.van-grid {
  background: #eee2cb;
}
.van-search {
  position: fixed;
  width: 100%;
  z-index: 100;
}
.Lunbo {
  margin-top: 55px;
}
.Di {
  position: fixed;
  z-index: 100;
  width: 100%;
}
.Center {
  margin-bottom: 50px;
}
.Zi {
  color: #f00;
}
</style>
