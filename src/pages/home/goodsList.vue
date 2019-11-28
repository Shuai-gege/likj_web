<template>
  <div class="goodsList">
    <!-- 头部公共搜索框 -->
    <search @cat="cat" :searchVal="searchValue" @gosearch="searchGoods"></search>
    <!-- 分类 -->
    <van-popup
      v-model="show"
      position="left"
      :overlay-style="{background:'transparent'}"
      :style="{ width: '40%',height:'100%', background:'#182128' }"
    >
      <div style="color:#fff" class="cat">
        <div class="item flex_l" @click="getCat('')">
          <img src="../../image/catall.png" alt />
          <span>全部分类</span>
        </div>
        <div
          class="item flex_l"
          v-for="(item,i) in catList"
          :key="i"
          @click="getCat(item.goods_category_id)"
        >
          <img :src="item.cate_img" alt />
          <span>{{item.name}}</span>
        </div>
      </div>
    </van-popup>
    <!-- 商品列表 -->
    <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
      <list :list="list"></list>
    </mescroll-vue>
  </div>
</template>
<script>
import search from "../../components/small-search";
import list from "../../components/com-list";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  data() {
    return {
      show: false, //分类弹窗
      catList: [], //分类列表
      searchValue: "", //搜索词
      classify_id: "", //分类id
      brand_id: "", //品牌id
      list: [], //初始收据
      mescroll: null, // mescroll实例对象
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
      }
    };
  },
  components: {
    search: search,
    list: list,
    MescrollVue // 注册mescroll组件
  },
  mounted() {
    this.initCat();
    this.brand_id = this.$route.query.brand_id;
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
        .post("/api/goods/index", {
          page: page.num,
          search: this.searchValue,
          classify_id: this.classify_id,
          brand_id: this.brand_id
        })
        .then(data => {
          // 请求的列表数据
          let arr = data;
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
    },
    // 分类接口
    initCat() {
      this.axios.post("/api/goods/goodsCategory").then(data => {
        this.catList = data;
      });
    },
    // 点击分类图标
    cat() {
      this.show = true;
    },
    // 点击分类类目
    getCat(id) {
      console.log(id);
      this.show = false;
      this.classify_id = id;
      this.searchValue = "";
      this.list = [];
      this.mescroll.resetUpScroll();
    },
    // 搜索
    searchGoods(value) {
      console.log(value);
      this.searchValue = value;
      this.classify_id = "";
      // 重置上拉
      this.list = [];
      this.mescroll.resetUpScroll();
    },
    // 点击返回按钮
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.goodsList {
  font-size: 13px;
  color: #0c0b0b;

  .mescroll {
    position: fixed;
    top: 44px;
    bottom: 0;
    height: 93vh;
  }

  .cat {
    color: #fff;
    padding: 20px 10px;
    .item {
      margin-bottom: 15px;
      img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
}
</style>

