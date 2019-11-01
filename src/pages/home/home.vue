<template>
  <div class="home">
    <!-- 搜索 -->
    <!-- <search1 url="/search"></search1> -->
    <!-- <search2 url="/search"></search2> -->
    <!-- 中间   下拉刷新 -->
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="content">
        <!-- 轮播图 -->
        <van-swipe :autoplay="3000" indicator-color="white" :height="160" class="Lunbo">
          <van-swipe-item class="lun" v-for="(item,i) in lunbo" :key="i">
            <van-image width="100%" height="160" fit="cover" :src="item" />
          </van-swipe-item>
        </van-swipe>
        <!-- 分类 九宫格 -->
        <div class="cat flex_l">
          <div class="item flex">
            <van-image
              width="1.05rem"
              height="1.05rem"
              fit="cover"
              radius="50%"
              src="https://s2.ax1x.com/2019/10/29/KRGCAP.png"
            />
            <p>神秘礼物</p>
          </div>
          <div class="item flex">
            <van-image
              width="1.05rem"
              height="1.05rem"
              fit="cover"
              radius="50%"
              src="https://s2.ax1x.com/2019/10/29/KRGPtf.png"
            />
            <p>收藏</p>
          </div>
          <div class="item flex" @click="$router.push('/login')">
            <van-image
              width="1.05rem"
              height="1.05rem"
              fit="cover"
              radius="50%"
              src="https://s2.ax1x.com/2019/10/29/KRGp7t.png"
            />
            <p>登录</p>
          </div>
          <div class="item flex">
            <van-image
              width="1.05rem"
              height="1.05rem"
              fit="cover"
              radius="50%"
              src="https://s2.ax1x.com/2019/10/29/KR8znA.png"
            />
            <p>消息</p>
          </div>
          <div class="item flex">
            <van-image
              width="1.05rem"
              height="1.05rem"
              fit="cover"
              radius="50%"
              src="https://s2.ax1x.com/2019/10/29/KRGS0I.png"
            />
            <p>乐学堂</p>
          </div>
          <div class="item flex">
            <van-image
              width="1.05rem"
              height="1.05rem"
              fit="cover"
              radius="50%"
              src="https://s2.ax1x.com/2019/10/29/KRGih8.png"
            />
            <p>礼物</p>
          </div>
          <div class="item flex">
            <van-image
              width="1.05rem"
              height="1.05rem"
              fit="cover"
              radius="50%"
              src="https://s2.ax1x.com/2019/10/29/KRGk9S.png"
            />
            <p>升级</p>
          </div>
          <div class="item flex">
            <van-image
              width="1.05rem"
              height="1.05rem"
              fit="cover"
              radius="50%"
              src="https://s2.ax1x.com/2019/10/29/KRGA1g.png"
            />
            <p>订单</p>
          </div>
          <div class="item flex">
            <van-image
              width="1.05rem"
              height="1.05rem"
              fit="cover"
              radius="50%"
              src="https://s2.ax1x.com/2019/10/29/KRGYu9.png"
            />
            <p>购物</p>
          </div>
          <div class="item flex">
            <van-image
              width="1.05rem"
              height="1.05rem"
              fit="cover"
              radius="50%"
              src="https://s2.ax1x.com/2019/10/29/KRGGjJ.png"
            />
            <p>淘宝</p>
          </div>
        </div>
        <!-- 公告 -->
        <div class="notice flex">
          <van-image
            width="2.5rem"
            height="0.8rem"
            fit="contain"
            src="data:image/png;base64,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"
          />
          <van-swipe
            :autoplay="3000"
            style="width:100%;height: 50px;line-height:50px;padding:0px 10px 0px 0px;"
            :vertical="true"
            :show-indicators="false"
          >
            <van-swipe-item
              class="lun"
              v-for="(item,i) in lunbo"
              :key="i"
              style="width:100%;height: 50px;"
            >
              <p
                class="yihang"
                style="color:#fc4c4c;"
              >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil enim necessitatibus recusandae tenetur, cumque iure deleniti delectus, hic praesentium perferendis facilis unde sed tempora inventore. Doloremque maxime autem vitae reprehenderit.</p>
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- 一张图 -->
        <div class="one">
          <van-image
            width="100%"
            height="120"
            fit="cover"
            radius="10px"
            src="https://s2.ax1x.com/2019/10/30/K4rXRg.png"
          />
        </div>
        <!-- 两张图 -->
        <!-- <div class="two flex">
          <van-image
            width="187.5"
            height="120"
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <van-image
            width="187.5"
            height="120"
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </div>-->
        <!-- 三张图 -->
        <div class="three flex">
          <van-image
            width="33.33%"
            height="120"
            fit="cover"
            src="https://s2.ax1x.com/2019/10/30/K4sCd0.png"
          />
          <van-image
            width="33.33%"
            height="120"
            fit="cover"
            src="https://s2.ax1x.com/2019/10/30/K4s9Zq.png"
          />
          <van-image
            width="33.33%"
            height="120"
            fit="cover"
            src="https://s2.ax1x.com/2019/10/30/K4sSLn.png"
          />
        </div>
        <!-- 精选商品 -->
        <div class="title" style="margin:10px 0 15px;">
          <img src="../../image/title.png" alt />
        </div>
        <!-- <list1 :list="list"></list1> -->
        <list2 :list="list"></list2>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import search1 from "@/components/com-search";
import list1 from "@/components/com-list";
import list2 from "@/components/com-colist";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  components: {
    search1,
    list1,
    list2,
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
    } else if (
      localStorage.getItem("token" + localStorage.getItem("sign_id"))
    ) {
      // alert(666);
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
  .mescroll {
    position: fixed;
    top: 0px;
    bottom: 0;
    height: 93vh;
  }

  // 九宫格
  .cat {
    color: #333;
    flex-wrap: wrap;
    background-color: #f5f6f7;
    padding: 10px 10px 0;
    .item {
      width: 20%;
      flex-direction: column;
      margin: 8px 0;
      font-size: 12px;
      p {
        margin-top: 5px;
      }
    }
  }
  //公告
  .notice {
    height: 40px;
    padding-left: 10px;
    font-size: 12px;
  }
  // 商品列表
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
  // 广告
  .one {
    font-size: 0px;
  }
  .title {
    width: 100%;
    height: 60px;
    img {
      width: 100%;
      height: 100%;
      font-size: 0;
    }
  }
}
</style>
