<template>
  <div class="home">
    <!-- 搜索 -->
    <!-- <search1 url="/search"></search1> -->
    <!-- <search2 url="/search"></search2> -->
    <!-- 中间   下拉刷新 -->
    <!-- <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit"> -->
    <div class="content">
      <!-- 轮播图 -->
      <van-swipe :autoplay="3000" indicator-color="white" :height="160" class="Lunbo">
        <van-swipe-item class="lun" v-for="(item,i) in home_banner" :key="i">
          <van-image
            width="100%"
            height="160"
            fit="cover"
            :src="item.image"
            @click="pageJump(item.jump_type,item.goods_id,item.brand_id,item.url,item.nav)"
          />
        </van-swipe-item>
      </van-swipe>
      <!-- 分类 九宫格 -->
      <div class="cat flex_l" v-if="initdata.nine_nav_status=='on'">
        <div
          class="item flex"
          v-for="(item,i) in nine_nav"
          :key="i"
          @click="pageJump(item.jump_type,item.goods_id,item.brand_id,item.url,item.nav)"
        >
          <van-image width="1.05rem" height="1.05rem" fit="cover" radius="50%" :src="item.image" />
          <p>{{item.name.length>5?item.name.substr(0,4)+'...':item.name}}</p>
        </div>
      </div>
      <!-- 公告 -->
      <div class="notice flex" v-if="initdata.notice_status=='on'">
        <van-image width="2.5rem" height="0.8rem" fit="contain" :src="notice.image" />
        <van-notice-bar
          style="flex:1;"
          background="#fff"
          :text="notice.title"
          @click="toNoticeDetail(notice.content)"
        />
      </div>

      <!-- 一张图 -->
      <div
        v-if="initdata.one_image_status=='on'"
        class="one"
        @click="pageJump(one_image.jump_type,one_image.goods_id,one_image.brand_id,one_image.url,one_image.nav)"
      >
        <van-image width="100%" height="120" fit="cover" :src="one_image.image" />
      </div>

      <!-- 三张图 -->
      <div class="three flex" v-if="initdata.three_image_status=='on'">
        <van-image
          width="33.33%"
          height="120"
          fit="cover"
          :src="item.image"
          v-for="(item,i) in three_image"
          :key="i"
          @click="pageJump(item.jump_type,item.goods_id,item.brand_id,item.url,item.nav)"
        />
      </div>
      <!-- 精选商品 -->
      <div class="title" style="margin:10px 0 15px;">
        <img src="../../image/title.png" alt />
      </div>
      <list1 v-if="initdata.goods_type==2" :list="list"></list1>
      <list2 v-else :list="list"></list2>
    </div>
    <!-- </mescroll-vue> -->
  </div>
</template>

<script>
import search1 from "@/components/com-search";
import list1 from "@/components/com-list";
import list2 from "@/components/com-colist";
// import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  components: {
    search1,
    list1,
    list2
    // MescrollVue // 注册mescroll组件
  },
  data() {
    return {
      initdata: {}, //首页装修，除了列表list以外的所有数据
      home_banner: [], //轮播
      nine_nav: [], //九宫格
      notice: {}, //公告
      one_image: {}, //一张广告图
      three_image: {}, //三张广告图

      list: []
      // mescroll: null, // mescroll实例对象
      // mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      // mescrollUp: {
      //   // 上拉加载的配置.
      //   callback: this.upCallback // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
      // }
    };
  },
  mounted() {
    // alert(location.href);
    if (this.$route.query.token) {
      localStorage.clear();
    }

    // localStorage.setItem(
    //   "baseURL",
    //   location.protocol + "//" + location.hostname
    // );

    if (this.$route.query.sign_id) {
      // alert(111);
      localStorage.setItem("sign_id", this.$route.query.sign_id);
    }

    if (
      !localStorage.getItem("token" + localStorage.getItem("sign_id")) &&
      !this.$route.query.token &&
      !localStorage.getItem("token_tel")
    ) {
      // alert("本地没token，走登录");
      // 走登录
      this.isWeixin();
    } else if (
      !localStorage.getItem("token" + localStorage.getItem("sign_id")) &&
      this.$route.query.token
    ) {
      // alert("本地没token，参数有");
      // alert(this.$route.query.token);
      localStorage.setItem(
        "token" + localStorage.getItem("sign_id"),
        this.$route.query.token
      );
      this.init();
    } else if (
      localStorage.getItem("token" + localStorage.getItem("sign_id")) ||
      localStorage.getItem("token_tel")
    ) {
      // alert("本地有token");
      this.init();
    }
  },
  methods: {
    // 判断浏览器环境,选择登录方式
    isWeixin() {
      // alert("调取后台登录方式");
      // 调取后台登录方式
      this.axios.post("/api/user/login_type").then(data => {
        this.login_type = data; //登录方式：1账号密码，2微信，3账号密码/微信
        if (data == 1) {
          // alert(data + "登录方式1，去login页面");
          this.$router.push("/login");
        } else if (data == 2) {
          // alert(data + "登录方式2，微信");
          location.href =
            localStorage.getItem("baseURL") +
            "/api/user/wxlogin?sign_id=" +
            localStorage.getItem("sign_id") +
            "&type=agent";
        } else {
          // alert(data + "登录方式3，两种方式都有，判断环境");
          var ua = navigator.userAgent.toLowerCase();
          if (ua.match(/MicroMessenger/i) == "micromessenger") {
            // alert("微信环境，走微信登录");
            this.iswx = true;
            location.href =
              localStorage.getItem("baseURL") +
              "/api/user/wxlogin?sign_id=" +
              localStorage.getItem("sign_id") +
              "&type=agent";
          } else {
            // alert("非微信环境，跳转登录页");
            this.$router.push("/login");
          }
        }
      });
    },
    // 公告详情
    toNoticeDetail(detail) {
      this.$router.push({
        path: "/noticeDetail",
        query: {
          detail: detail
        }
      });
    },
    // 跳转链接
    // "jump_type":  跳转类型1商品2品牌3url4菜单功能
    // "goods_id":   跳转的商品id
    // "brand_id":   跳转的品牌id
    // "url":        外部url链接
    // "nav":        导航菜单
    // 'yqdl'   =>   '邀请代理',      =>/agentType
    // 'shsq'   =>   '审核授权',      =>/audit
    // 'wysj'   =>   '我要升级',      =>/update
    // 'sqzs'   =>   '授权证书',      =>/ccie
    // 'dlyc'   =>   '代理云仓',      =>/stock
    // 'ycdd'   =>   '云仓订单',      =>/orderList?orderType=2
    // 'thdd'   =>   '提货订单',      =>/orderList?orderType=3
    // 'xjdd'   =>   '下级订单',      =>/downorder
    // 'wdzd'   =>   '我的转单',      =>/zhuandanorder
    // 'czzx'   =>   '充值中心',      =>/topup
    // 'wytx'   =>   '我要提现',      =>/tixian
    // 'xjcz'   =>   '下级充值',      =>/topuplist
    // 'xjtx'   =>   '下级提现',      =>/xiajitixianlist
    // 'tdzx'   =>   '团队中心',      =>/teamcenter
    // 'zjdl'   =>   '直接代理',      =>/myteam?type=1
    // 'jjdl'   =>   '间接代理',      =>/myteam?type=2
    // 'wdqb'   =>   '我的钱包',      =>/mypurse
    // 'jjmx'   =>   '奖金明细',      =>/bonus
    // 'gsskzh' =>   '公司收款账户',  =>/shoukuan
    // 'wdskzh' =>   '我的收款账户',  =>/myaccount
    // 'shdz'   =>   '收货地址',      =>/address
    // 'yezhk'  =>   '余额转货款',    =>/change
    // 'zjmx'   =>   '资金明细',      =>/moneydetail
    pageJump(type, goods_id, brand_id, url, nav) {
      if (type == 1) {
        this.$router.push({
          path: "/detail",
          query: {
            goods_id: goods_id
          }
        });
      } else if (type == 2) {
        this.$router.push({
          path: "/goodsList",
          query: {
            brand_id: brand_id
          }
        });
      } else if (type == 3) {
        location.href = url;
      } else if (type == 4) {
        let path;
        let query;
        switch (nav) {
          case "ycdd":
            path = "/orderList";
            query = { orderType: 2 };
            break;
          case "thdd":
            path = "/orderList";
            query = { orderType: 3 };
            break;
          case "zjdl":
            path = "/myteam";
            query = { type: 1 };
            break;
          case "jjdl":
            path = "/myteam";
            query = { type: 2 };
            break;
          case "yqdl":
            path = "/agentType";
            break;
          case "shsq":
            path = "/audit";
            break;
          case "wysj":
            path = "/update";
            break;
          case "sqzs":
            path = "/ccie";
            break;
          case "dlyc":
            path = "/stock";
            break;
          case "xjdd":
            path = "/downorder";
            break;
          case "wdzd":
            path = "/zhuandanorder";
            break;
          case "czzx":
            path = "/topup";
            break;
          case "wytx":
            path = "/tixian";
            break;
          case "xjcz":
            path = "/topuplist";
            break;
          case "xjtx":
            path = "/xiajitixianlist";
            break;
          case "tdzx":
            path = "/teamcenter";
            break;
          case "wdqb":
            path = "/mypurse";
            break;
          case "jjmx":
            path = "/bonus";
            break;
          case "gsskzh":
            path = "/shoukuan";
            break;
          case "wdskzh":
            path = "/myaccount";
            break;
          case "shdz":
            path = "/address";
            break;
          case "yezhk":
            path = "/change";
            break;
          case "zjmx":
            path = "/moneydetail";
            break;
        }
        if (query) {
          this.$router.push({
            path: path,
            query: query
          });
        } else {
          this.$router.push({
            path: path
          });
        }
      }
    },
    // 首页装修接口,没有list列表
    init() {
      this.axios.post("/api/index/home").then(data => {
        this.initdata = data;
        this.home_banner = data.home_banner;
        this.nine_nav = data.nine_nav; //九宫格
        this.notice = data.notice; //公告
        this.one_image = data.one_image; //一张广告图
        this.three_image = data.three_image; //三张广告图
        this.init1();
        this.init2();
      });
    },
    // 首页列表接口
    init1() {
      this.axios
        .post("/api/index/index", {
          page: 1
        })
        .then(data => {
          this.list = data.good_list;
        });
    },
    // user/index接口
    init2() {
      this.axios.post("/api/user/index").then(data => {
        localStorage.setItem("model", data.cloud_model);
      });
    }
    // mescroll组件初始化的回调,可获取到mescroll对象
    // mescrollInit(mescroll) {
    //   this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    // }
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    // upCallback(page, mescroll) {
    //   console.log(page);
    // this.axios
    //   .post("/api/index/index", {
    //     page: page.num
    //   })
    //   .then(data => {
    //     this.init();
    //     // 请求的列表数据
    //     let arr = data.good_list;
    //     // 如果是第一页需手动置空列表
    //     if (page.num === 1) {
    //       this.list = [];
    //     }
    //     // 把请求到的数据添加到列表
    //     this.list = this.list.concat(arr);
    //     // 数据渲染成功后,隐藏下拉刷新的状态
    //     this.$nextTick(() => {
    //       mescroll.endSuccess(arr.length, true);
    //     });
    //   })
    //   .catch(e => {
    //     // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
    //     mescroll.endErr();
    //   });
    // }
  }
};
</script>

<style scoped lang="less">
.home {
  // .mescroll {
  //   position: fixed;
  //   top: 0px;
  //   bottom: 0;
  //   height: 93vh;
  // }
  padding-bottom: 55px;
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
  .one,
  .three {
    font-size: 0px;
    img {
      font-size: 0px;
    }
  }
  .title {
    width: 100%;
    height: 70px;
    padding: 10px 25px 0;
    img {
      width: 100%;
      height: 100%;
      font-size: 0;
    }
  }
}
</style>
