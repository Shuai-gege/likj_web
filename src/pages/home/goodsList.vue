<template>
  <div class="goodsList">
    <!-- 头部公共搜索框 -->
    <search @gosearch="searchGoods"></search>
    <!-- 筛选 -->
    <!-- <van-dropdown-menu active-color="#ee0a24">
      <van-dropdown-item v-model="value1" :options="option1" ref="item1" @change="change1" />
      <van-dropdown-item v-model="value2" :options="option2" ref="item2" @change="change2" />
    </van-dropdown-menu>-->
    <!-- 下拉刷新 -->
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
    <!-- 商品列表 -->
    <div class="null" v-if="list.length==0">暂无商品</div>

    <list :list="list" :type="type"></list>
    <!-- </van-pull-refresh> -->
  </div>
</template>
<script>
import search from "../../components/small-search";
import list from "../../components/com-list";
export default {
  data() {
    return {
      type: 0, //列表类型 0 商城列表  1 本地仓库列表
      searchValue: "", //搜索词
      classify_id: "", //分类id
      list: [], //初始收据
      page: 1, //当前页

      value1: 0, //筛选
      value2: "a",
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      option2: [
        { text: "默认排序", value: "a" },
        { text: "好评排序", value: "b" },
        { text: "销量排序", value: "c" }
      ]
    };
  },
  components: {
    search: search,
    list: list
  },
  mounted() {
    this.searchValue = this.$route.query.searchValue;
    this.classify_id = this.$route.query.classify_id;
    this.type = this.$route.query.type;
    if (this.type) {
      this.init1();
    } else {
      this.init();
    }
  },
  methods: {
    // 普通列表
    init() {
      this.axios
        .post("/api/goods/index", {
          search: this.searchValue,
          classify_id: this.classify_id,
          page: 1
        })
        .then(data => {
          this.list = data;
        });
    },
    // 本地仓库
    init1() {
      this.axios
        .post("/api/goods_order/warehouseList", {
          // search: this.searchValue,
          page: this.page
        })
        .then(data => {
          // 加载状态结束
          this.loading = false;
          if (data.length == 0) {
            // 数据全部加载完成
            this.finished = true;
          } else {
            this.list = this.list.concat(data);
          }
        });
    },
    // 点击筛选弹窗选项
    change1() {
      console.log(this.value1);
    },
    change2() {
      console.log(this.value2);
    },
    // 搜索
    searchGoods(value) {
      console.log(value);
      this.searchValue = value;
      // 重置上拉
      this.page = 1;
      this.list = [];
      this.finished = false;
      console.log(this.page, "aaaaaaaaa");
      this.init();
    },
    // 点击返回按钮
    goBack() {
      this.$router.go(-1);
    }
    // 下拉刷新
    // onRefresh() {
    //   this.init();
    //   setTimeout(() => {
    //     this.$toast("刷新成功");
    //     this.isLoading = false;
    //   }, 500);
    // }
  }
};
</script>

<style lang="less" scoped>
.goodsList {
  font-size: 14px;
  color: #0c0b0b;
  .list {
    padding: 12px;
    flex-wrap: wrap;
    margin-top: -1px;
    padding-bottom: 55px;
    li {
      background-color: #fff;
      width: 48%;
      height: 250px;
      margin-bottom: 10px;
      box-shadow: 1px 3px 5px #e6dada;
      border-radius: 5px;
      .name {
        font-size: 14px;
        margin: 5px 5px 3px;
        color: #333;
        height: 40px;
      }
      .pro {
        font-size: 12px;
        color: #666;
        margin: 0 5px;
      }
      .price {
        font-size: 16px;
        color: #f00;
        margin: 2px 5px;
        i {
          font-size: 14px;
        }
      }
    }
  }
}
</style>

