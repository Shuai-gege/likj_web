<template>
  <div class="home">
    <!-- 搜索 -->
    <search url="/search"></search>
    <!-- 中间 -->
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="Center">
        <!-- 下拉刷新 -->
        <!-- 轮播图 -->
        <van-swipe
          :autoplay="3000"
          indicator-color="white"
          :height="200"
          class="Lunbo"
          style="border-radius:15px"
        >
          <van-swipe-item class="lun" v-for="(item,i) in lunbo" :key="i">
            <van-image width="100%" height="200" fit="cover" :src="item" />
          </van-swipe-item>
        </van-swipe>
        <!-- 分类 -->
        <!-- <van-grid :gutter="10" style="border-radius:15px">
          <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="这是啥" />
        </van-grid>-->
        <!-- tap商品 -->
        <!-- <van-tabs v-model="active" animated>
          <van-tab title="每日推荐">
            <list :list="list"></list>
          </van-tab>
          <van-tab title="每日精选">
            <list :list="list"></list>
          </van-tab>
        </van-tabs>-->

        <list :list="list"></list>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import search from "@/components/com-search";
import list from "@/components/com-list";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  components: {
    search,
    list,
    MescrollVue // 注册mescroll组件
  },
  data() {
    return {
      lunbo: [],
      list: [],
      mescroll: null, // mescroll实例对象
      mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
      }
    };
  },
  mounted() {
    // alert(location.href);
    if (this.$route.query.sign_id) {
      // alert(111);
      localStorage.setItem("sign_id", this.$route.query.sign_id);
      localStorage.setItem(
        "baseURL",
        location.protocol + "//" + location.hostname
      );
    }
    if (
      !localStorage.getItem("token" + localStorage.getItem("sign_id")) &&
      !this.$route.query.token
    ) {
      // alert(33333333);

      location.href =
        localStorage.getItem("baseURL") +
        "/api/user/wxlogin?sign_id=" +
        localStorage.getItem("sign_id");
    } else if (
      !localStorage.getItem("token" + localStorage.getItem("sign_id")) &&
      this.$route.query.token
    ) {
      // alert(11111111111);
      // alert(this.$route.query.token);
      localStorage.setItem(
        "token" + localStorage.getItem("sign_id"),
        this.$route.query.token
      );
      // this.init();
    } else if (
      localStorage.getItem("token" + localStorage.getItem("sign_id"))
    ) {
      // alert(666);
      // this.init();
    }
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      console.log(page);
      this.axios
        .post("/api/index/index", {
          page: page.num
        })
        .then(data => {
          this.lunbo = data.index_banner.split(",");
          // 请求的列表数据
          let arr = data.good_list;
          // 如果是第一页需手动置空列表
          if (page.num === 1) {
            this.list = [];
          }
          // 把请求到的数据添加到列表
          this.list = this.list.concat(arr);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length, true);
          });
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    }
  }
};
</script>

<style scoped lang="less">
.home {
  .van-row {
    margin-bottom: 15px;
    margin-top: -15px;
  }
}
.mescroll {
  position: fixed;
  top: 0px;
  bottom: 0;
  height: 93vh;
}
.van-search {
  position: fixed;
  width: 100%;
  z-index: 100;
}

.Lunbo {
  margin: 60px 10px 12px;
}

.swipe {
  margin: 0 auto;
}

.van-col--offset-1 {
  margin-top: -2.625rem;
}

.Zi {
  color: #f00;
}
.list {
  padding: 12px;
  flex-wrap: wrap;
  margin-top: -1px;
  li {
    width: 48%;
    margin-bottom: 10px;
    box-shadow: 1px 3px 5px #e6dada;
    border-radius: 5px;

    .name {
      font-size: 15px;
      margin: 10px 5px 5px;
      color: #333;
    }
    .pro {
      font-size: 12px;
      color: #666;
      margin: 0 5px;
    }
    .price {
      font-size: 20px;
      color: #f00;
      margin: 5px;
      i {
        font-size: 10px;
      }
    }
  }
}
header {
  height: 44px;
}
</style>
