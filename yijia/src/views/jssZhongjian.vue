<template>
  <div class="box">
    <!-- 搜索框 -->
    <router-view></router-view>
    <div class="Center">
      <!-- 下拉刷新 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <!-- 轮播图 -->
        <van-row>
          <van-col span="22" offset="1">
            <van-swipe
              :autoplay="3000"
              indicator-color="white"
              height="200"
              class="Lunbo"
              style="border-radius:15px"
            >
              <van-swipe-item class="lun">1</van-swipe-item>
              <van-swipe-item class="lun">2</van-swipe-item>
              <van-swipe-item class="lun">3</van-swipe-item>
              <van-swipe-item class="lun">4</van-swipe-item>
            </van-swipe>
          </van-col>
        </van-row>
        <!-- 分割线 -->
        <van-divider>往下看</van-divider>
        <!-- 分类 -->
        <van-grid :gutter="10" style="border-radius:15px">
          <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="这是啥" @click="detail" />
        </van-grid>&nbsp;
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
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import { Popup } from "vant";
Vue.use(Popup);
export default {
  name: "Zhongjian",
  data() {
    return {
      isLoading: false
    };
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
  },
  mounted() {
    axios({
      method: "GET",
      url: "http://lj.tieqiao.shop/api/index/index"
    }).then(data => {
      console.log(data.data);
    });
  }
};
</script>
<style lang="stylus" scoped>
.box {
  background: rgba(144, 215, 236, 0.5);
}

.lun {
  background: rgba(51, 119, 255, 0.5);
}

.van-grid {
  background: rgba(51, 119, 255, 0.5);
}

.van-search {
  position: fixed;
  width: 100%;
  z-index: 100;
}

.Lunbo {
  margin-top: 58px;
  width: 100%;
}

.swipe {
  margin: 0 auto;
}

.Center {
  padding-top: 55px;
  margin-bottom: 50px;
}

.van-search__content van-search__content--round {
}

.van-col--offset-1 {
  margin-top: -2.625rem;
}

.Zi {
  color: #f00;
}
</style>