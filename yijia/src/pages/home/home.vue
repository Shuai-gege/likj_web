<template>
  <div class="home">
    <!-- 搜索 -->
    <search></search>

    <!-- 中间 -->
    <div class="Center">
      <!-- 下拉刷新 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <!-- 轮播图 -->
        <van-swipe
          :autoplay="3000"
          indicator-color="white"
          height="200"
          class="Lunbo"
          style="border-radius:15px"
        >
          <van-swipe-item class="lun">2</van-swipe-item>
          <van-swipe-item class="lun">3</van-swipe-item>
          <van-swipe-item class="lun">4</van-swipe-item>
        </van-swipe>
        <!-- 分类 -->
        <van-grid :gutter="10" style="border-radius:15px">
          <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="这是啥" @click="detail" />
        </van-grid>&nbsp;
        <!-- tap商品 -->
        <van-tabs v-model="active" animated>
          <van-tab title="每日推荐">
            <ul class="list flex">
              <li>
                <img src="../../image/login.gif" alt />
                <div class="name">纯银999情侣对戒</div>
                <div class="pro yihang">匠心制作唯美大气匠心制作唯美大气匠心制作唯美大气匠心制作唯美大气</div>
                <div class="price">
                  <i>￥</i>888
                </div>
              </li>
              <li>
                <img src="../../image/login.gif" alt />
                <div class="name">纯银999情侣对戒</div>
                <div class="pro yihang">匠心制作唯美大气匠心制作唯美大气匠心制作唯美大气匠心制作唯美大气</div>
                <div class="price">
                  <i>￥</i>888
                </div>
              </li>
              <li>
                <img src="../../image/login.gif" alt />
                <div class="name">纯银999情侣对戒</div>
                <div class="pro yihang">匠心制作唯美大气匠心制作唯美大气匠心制作唯美大气匠心制作唯美大气</div>
                <div class="price">
                  <i>￥</i>888
                </div>
              </li>
              <li>
                <img src="../../image/login.gif" alt />
                <div class="name">纯银999情侣对戒</div>
                <div class="pro yihang">匠心制作唯美大气匠心制作唯美大气匠心制作唯美大气匠心制作唯美大气</div>
                <div class="price">
                  <i>￥</i>888
                </div>
              </li>
              <li>
                <img src="../../image/login.gif" alt />
                <div class="name">纯银999情侣对戒</div>
                <div class="pro yihang">匠心制作唯美大气匠心制作唯美大气匠心制作唯美大气匠心制作唯美大气</div>
                <div class="price">
                  <i>￥</i>888
                </div>
              </li>
              <li>
                <img src="../../image/login.gif" alt />
                <div class="name">纯银999情侣对戒</div>
                <div class="pro yihang">匠心制作唯美大气匠心制作唯美大气匠心制作唯美大气匠心制作唯美大气</div>
                <div class="price">
                  <i>￥</i>888
                </div>
              </li>
            </ul>
          </van-tab>
          <van-tab title="每日精选">
            <ul class="list flex">
              <li>
                <img src="../../image/login.gif" alt />
                <div class="name">纯银999情侣对戒</div>
                <div class="pro yihang">匠心制作唯美大气匠心制作唯美大气匠心制作唯美大气匠心制作唯美大气</div>
                <div class="price">
                  <i>￥</i>888
                </div>
              </li>
              <li>
                <img src="../../image/login.gif" alt />
                <div class="name">纯银999情侣对戒</div>
                <div class="pro yihang">匠心制作唯美大气匠心制作唯美大气匠心制作唯美大气匠心制作唯美大气</div>
                <div class="price">
                  <i>￥</i>888
                </div>
              </li>
              <li>
                <img src="../../image/login.gif" alt />
                <div class="name">纯银999情侣对戒</div>
                <div class="pro yihang">匠心制作唯美大气匠心制作唯美大气匠心制作唯美大气匠心制作唯美大气</div>
                <div class="price">
                  <i>￥</i>888
                </div>
              </li>
            </ul>
          </van-tab>
        </van-tabs>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import search from "@/components/com-search";
export default {
  components: {
    search
  },
  data() {
    return {
      isLoading: false,
      active: 1
    };
  },
  mounted() {
    // alert(location.href);
    // if (!localStorage.getItem("token") && !this.$route.query.token) {
    //   alert(33333333);
    //   location.href = "http://lj.tieqiao.shop/api/user/wxlogin";
    // } else if (!localStorage.getItem("token") && this.$route.query.token) {
    //   alert(11111111111);
    //   alert(this.$route.query.token);
    //   localStorage.setItem("token", this.$route.query.token);
    //   this.axios.post("/api/user/index").then(data => {
    //     console.log(data);
    //   });
    // }
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast("好看吗？");
        this.isLoading = false;
      }, 500);
    },
    detail() {
      this.$router.push("/jssdetail");
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

.lun {
  background: rgba(51, 119, 255, 0.5);
}

.van-grid {
  // background: rgba(51, 119, 255, 0.5);
}

.van-search {
  position: fixed;
  width: 100%;
  z-index: 100;
}

.Lunbo {
  margin: 70px 20px 20px;
}

.swipe {
  margin: 0 auto;
}

.Center {
  //   padding-top: 55px;
  margin-bottom: 50px;
}

.van-col--offset-1 {
  margin-top: -2.625rem;
}

.Zi {
  color: #f00;
}
.list {
  padding: 10px;
  flex-wrap: wrap;
  li {
    width: 48%;
    margin-bottom: 10px;
    img {
      width: 100%;
      height: 170px;
      background: rgba(255, 255, 255, 1);
      border-radius: 10px;
    }
    .name {
      font-size: 16px;
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
